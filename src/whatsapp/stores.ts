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

import * as collections from './collections';
import { exportModule } from './exportModule';

/**
 * @whatsapp 2.2136.9:15701
 * @whatsapp 2.2136.10:15701
 */
export declare const BlocklistStore: collections.BlocklistCollection;
/**
 * @whatsapp 2.2136.9:54100
 * @whatsapp 2.2136.10:54100
 */
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
/**
 * @whatsapp 2.2136.9:8581
 * @whatsapp 2.2136.10:8581
 */
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
/**
 * @whatsapp 2.2136.9:15971
 * @whatsapp 2.2136.10:15971
 */
export declare const CallStore: collections.CallCollection;
/**
 * @whatsapp 2.2136.9:25523
 * @whatsapp 2.2136.10:25523
 */
export declare const CartStore: collections.CartCollection;
/**
 * @whatsapp 2.2136.9:60028
 * @whatsapp 2.2136.10:60028
 */
export declare const CatalogStore: collections.CatalogCollection;
/**
 * @whatsapp 2.2136.9:84758
 * @whatsapp 2.2136.10:84758
 */
export declare const ChatStore: collections.ChatCollection;
/**
 * @whatsapp 2.2136.9:17025
 * @whatsapp 2.2136.10:17025
 */
export declare const ContactStore: collections.ContactCollection;
/**
 * @whatsapp 2.2136.9:41098
 * @whatsapp 2.2136.10:41098
 */
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
/**
 * @whatsapp 2.2136.9:75798
 * @whatsapp 2.2136.10:75798
 */
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
/**
 * @whatsapp 2.2136.9:59606
 * @whatsapp 2.2136.10:59606
 */
export declare const LabelStore: collections.LabelCollection;
/**
 * @whatsapp 2.2136.9:31104
 * @whatsapp 2.2136.10:31104
 */
export declare const LiveLocationStore: collections.LiveLocationCollection;
/**
 * @whatsapp 2.2136.9:45472
 * @whatsapp 2.2136.10:45472
 */
export declare const MsgStore: collections.MsgCollection;
/**
 * @whatsapp 2.2136.9:57636
 * @whatsapp 2.2136.10:57636
 */
export declare const MsgInfoStore: collections.MsgInfoCollection;
/**
 * @whatsapp 2.2136.9:80959
 * @whatsapp 2.2136.10:80959
 */
export declare const MuteStore: collections.MuteCollection;
/**
 * @whatsapp 2.2136.9:98052
 * @whatsapp 2.2136.10:98052
 */
export declare const OrderStore: collections.OrderCollection;
/**
 * @whatsapp 2.2136.9:48327
 * @whatsapp 2.2136.10:48327
 */
export declare const PresenceStore: collections.PresenceCollection;
/**
 * @whatsapp 2.2136.9:97038
 * @whatsapp 2.2136.10:97038
 */
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
/**
 * @whatsapp 2.2136.9:3165
 * @whatsapp 2.2136.10:3165
 */
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
/**
 * @whatsapp 2.2136.9:65963
 * @whatsapp 2.2136.10:65963
 */
export declare const QuickReplyStore: collections.QuickReplyCollection;
/**
 * @whatsapp 2.2136.9:30462
 * @whatsapp 2.2136.10:30462
 */
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
/**
 * @whatsapp 2.2136.9:27686
 * @whatsapp 2.2136.10:27686
 */
export declare const RecentStickerStore: collections.RecentStickerCollection;
/**
 * @whatsapp 2.2136.9:30118
 * @whatsapp 2.2136.10:30118
 */
export declare const StarredMsgStore: collections.StarredMsgCollection;
/**
 * @whatsapp 2.2136.9:68477
 * @whatsapp 2.2136.10:68477
 */
export declare const StarredStickerStore: collections.StarredStickerCollection;
/**
 * @whatsapp 2.2136.9:22360
 * @whatsapp 2.2136.10:22360
 */
export declare const StatusStore: collections.StatusCollection;
/**
 * @whatsapp 2.2136.9:83125
 * @whatsapp 2.2136.10:83125
 */
export declare const StatusV3Store: collections.StatusV3Collection;
/**
 * @whatsapp 2.2136.9:16482
 * @whatsapp 2.2136.10:16482
 */
export declare const StickerStore: collections.StickerCollection;
/**
 * @whatsapp 2.2136.9:61848
 * @whatsapp 2.2136.10:61848
 */
export declare const StickerPackStore: collections.StickerPackCollection;
/**
 * @whatsapp 2.2136.9:6009
 * @whatsapp 2.2136.10:6009
 */
export declare const StickerSearchStore: collections.StickerSearchCollection;

const storeNames = [
  'BlocklistStore',
  'BusinessCategoriesResultStore',
  'BusinessProfileStore',
  'CallStore',
  'CartStore',
  'CatalogStore',
  'ChatStore',
  'ContactStore',
  'EmojiVariantStore',
  'GroupMetadataStore',
  'LabelStore',
  'LiveLocationStore',
  'MsgStore',
  'MsgInfoStore',
  'MuteStore',
  'OrderStore',
  'PresenceStore',
  'ProductMessageListStore',
  'ProfilePicThumbStore',
  'QuickReplyStore',
  'RecentEmojiStore',
  'RecentStickerStore',
  'StarredMsgStore',
  'StarredStickerStore',
  'StatusStore',
  'StatusV3Store',
  'StickerStore',
  'StickerPackStore',
  'StickerSearchStore',
];

for (const name of storeNames) {
  const collectionName = name.replace('Store', 'Collection');
  exportModule(
    exports,
    {
      [name]: 'default',
    },
    (m) => m.default instanceof (collections as any)[collectionName]
  );
}
