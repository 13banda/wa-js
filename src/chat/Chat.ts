/*!
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Debug from 'debug';
import Emittery from 'emittery';

import { assertFindChat, assertGetChat, assertWid } from '../assert';
import { WPPError } from '../util';
import * as webpack from '../webpack';
import {
  ButtonCollection,
  ChatModel,
  ChatStore,
  ClockSkew,
  Constants,
  MsgKey,
  ReplyButtonModel,
  UserPrefs,
  Wid,
} from '../whatsapp';
import {
  addAndSendMsgToChat,
  findChat,
  randomMessageId,
} from '../whatsapp/functions';
import {
  ChatEventTypes,
  ListMessageOptions,
  MessageButtonsOptions,
  RawMessage,
  SendMessageOptions,
  TextMessageOptions,
} from './types';

const debugChat = Debug('WPP:chat');
const debugMessage = Debug('WPP:message');

export class Chat extends Emittery<ChatEventTypes> {
  public defaultSendMessageOptions: SendMessageOptions = {
    createChat: false,
    waitForAck: true,
  };

  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    ChatStore.on(Constants.COLLECTION_HAS_SYNCED, () => {
      debugChat(Constants.COLLECTION_HAS_SYNCED);
    });

    debugChat('initialized');
  }

  async find(chatId: string | Wid): Promise<ChatModel> {
    const wid = assertWid(chatId);
    return findChat(wid);
  }

  get(chatId: string | Wid): ChatModel | undefined {
    const wid = assertWid(chatId);
    return ChatStore.get(wid);
  }

  prepareMessageButtons(
    message: RawMessage,
    options: MessageButtonsOptions
  ): RawMessage {
    if (!options.buttons) {
      return message;
    }

    if (!Array.isArray(options.buttons)) {
      throw 'Buttons options is not a array';
    }

    if (options.buttons.length === 0 || options.buttons.length > 3) {
      throw 'Buttons options must have between 1 and 3 options';
    }

    if (message.type === 'chat') {
      message.contentText = message.body;
    } else {
      message.contentText = message.caption;
    }

    message.title = options.title;
    message.footer = options.footer;
    message.isDynamicReplyButtonsMsg = true;

    message.dynamicReplyButtons = options.buttons.map((b) => ({
      buttonId: b.id,
      buttonText: { displayText: b.text },
      type: 1,
    }));

    // For UI only
    message.replyButtons = new ButtonCollection();
    message.replyButtons.add(
      message.dynamicReplyButtons.map(
        (b) =>
          new ReplyButtonModel({
            id: b.buttonId,
            displayText: b.buttonText?.displayText || undefined,
          })
      )
    );

    return message;
  }

  async sendRawMessage(
    chatId: any,
    message: RawMessage,
    options: SendMessageOptions = this.defaultSendMessageOptions
  ): Promise<any> {
    const chat = options.createChat
      ? await assertFindChat(chatId)
      : assertGetChat(chatId);

    message = {
      t: ClockSkew.globalUnixTime(),
      from: UserPrefs.getMaybeMeUser(),
      to: chat.id,
      self: 'out',
      isNewMsg: true,
      local: true,
      ack: Constants.ACK.CLOCK,
      ...message,
    };

    if (!message.id) {
      message.id = new MsgKey({
        from: UserPrefs.getMaybeMeUser(),
        to: chat.id,
        id: randomMessageId(),
        selfDir: 'out',
      });
    }

    debugMessage(`sending message (${message.type}) with id ${message.id}`);
    const result = await addAndSendMsgToChat(chat, message);
    debugMessage(`message ${message.id} queued`);

    const finalMessage = await result[0];

    if (options.waitForAck) {
      debugMessage(`waiting ack for ${message.id}`);

      const sendResult = await result[1];

      debugMessage(
        `ack received for ${message.id} (ACK: ${finalMessage.ack}, SendResult: ${sendResult})`
      );
    }

    return {
      id: finalMessage.id.toString(),
      ack: finalMessage.ack,
    };
  }

  async sendTextMessage(
    chatId: any,
    content: any,
    options: TextMessageOptions = this.defaultSendMessageOptions
  ): Promise<any> {
    let message: RawMessage = {
      body: content,
      type: 'chat',
      subtype: null,
      urlText: null,
      urlNumber: null,
    };

    message = this.prepareMessageButtons(message, options);

    return await this.sendRawMessage(chatId, message, options);
  }

  /**
   * Send a list message
   *
   * @example
   * ```javascript
   * WPP.chat.sendListMessage('<number>@c.us', {
   *   buttonText: 'Click Me!',
   *   description: "Hello it's list message",
   *   sections: [{
   *     title: 'Section 1',
   *     rows: [{
   *       rowId: 'rowid1',
   *       title: 'Row 1',
   *       description: "Hello it's description 1",
   *     },{
   *       rowId: 'rowid2',
   *       title: 'Row 2',
   *       description: "Hello it's description 2",
   *     }]
   *   }]
   * });
   * ```
   */
  async sendListMessage(
    chatId: any,
    options: ListMessageOptions
  ): Promise<any> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    const sections = options.sections;

    if (!Array.isArray(sections)) {
      throw new WPPError('invalid_list_type', 'Sections must be an array');
    }

    if (sections.length === 0 || sections.length > 10) {
      throw new WPPError(
        'invalid_list_size',
        'Sections options must have between 1 and 10 options'
      );
    }

    const list: RawMessage['list'] = {
      buttonText: options.buttonText,
      description: options.description,
      listType: 1,
      sections,
    };

    const message: RawMessage = {
      type: 'list',
      list,
    };

    return await this.sendRawMessage(chatId, message, options);
  }
}
