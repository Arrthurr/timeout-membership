const WEBSTORE = "https://timeoutlounge.zenoti.com/webstoreNew";
const CENTER_ID = "873658fa-44c6-4608-9402-09634ce4864c";

const ZENOTI_SERVICE_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

declare const zenotiServiceIdBrand: unique symbol;

export type ZenotiServiceId = string & {
  readonly [zenotiServiceIdBrand]: typeof zenotiServiceIdBrand;
};

export function zenotiServiceId(raw: string): ZenotiServiceId {
  if (!ZENOTI_SERVICE_ID_PATTERN.test(raw)) {
    throw new Error(`Invalid Zenoti service id: ${raw}`);
  }

  return raw as ZenotiServiceId;
}

export function zenotiServiceUrl(id: ZenotiServiceId): string {
  return `${WEBSTORE}/${CENTER_ID}?serviceid=${id}`;
}

export const ZENOTI_BOOK_NOW_URL = `${WEBSTORE}/services/${CENTER_ID}`;
export const ZENOTI_ACCOUNT_URL = `${WEBSTORE}/user/signIn`;
export const ZENOTI_GIFT_CARDS_URL = `${WEBSTORE}/giftcards/${CENTER_ID}`;
