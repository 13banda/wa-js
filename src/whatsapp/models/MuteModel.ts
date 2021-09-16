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

import { MuteCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/**
 * @whatsapp 2.2126.14:44744
 */
interface Props {
  id: Wid;
  expiration?: any;
}

/**
 * @whatsapp 2.2126.14:44744
 */
interface Session {
  stale?: any;
  promises?: any;
}

/**
 * @whatsapp 2.2126.14:44744
 */
interface Derived {
  isMuted: boolean;
}

/**
 * @whatsapp 2.2126.14:44744
 */
export declare interface MuteModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 2.2126.14:44744
 */
export declare class MuteModel extends Model<MuteCollection> {
  idClass: typeof Wid;
  allowedIds?: any;
  constructor(
    proterties?: ModelPropertiesContructor<MuteModel>,
    options?: ModelOptions
  );
  setMute(e?: any, t?: any): any;
  mute(e?: any, t?: any, r?: any): any;
  canMute(): boolean;
  unmute(e?: any, t?: any): any;
  getCollection(): MuteCollection;
}

exportProxyModel(exports, 'MuteModel');
