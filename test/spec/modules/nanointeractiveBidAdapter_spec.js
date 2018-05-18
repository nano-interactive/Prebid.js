import { expect } from 'chai';
import * as utils from 'src/utils';
import * as sinon from 'sinon';

import {
  BIDDER_CODE,
  CATEGORY,
  CATEGORY_NAME,
  DATA_PARTNER_PIXEL_ID,
  ENGINE_BASE_URL,
  NQ,
  NQ_NAME,
  REF,
  spec,
  SUB_ID
} from '../../../modules/nanointeractiveBidAdapter';

describe('nanointeractive adapter tests', function () {
  const SIZES_PARAM = 'sizes';
  const BID_ID_PARAM = 'bidId';
  const BID_ID_VALUE = '24a1c9ec270973';
  const CORS_PARAM = 'cors';
  const DATA_PARTNER_PIXEL_ID_VALUE = 'pid1';
  const NQ_VALUE = 'rumpelstiltskin';
  const NQ_NAME_VALUE = 'nqName';
  const CATEGORY_VALUE = 'some category';
  const CATEGORY_NAME_VALUE = 'catName';
  const SUB_ID_VALUE = '123';
  const REF_NO_VALUE = 'none';
  const REF_OTHER_VALUE = 'other';
  const WIDTH1 = 300;
  const HEIGHT1 = 250;
  const WIDTH2 = 468;
  const HEIGHT2 = 60;
  const SIZES_VALUE = [[WIDTH1, HEIGHT1], [WIDTH2, HEIGHT2]];
  const AD = '<script type="text/javascript" src="https://trc.audiencemanager.de/ad/?pl=58c2829beb0a193456047a27&cb=${CACHEBUSTER}&tc=${CLICK_URL_ENC}"></script> <noscript> <a href="https://trc.audiencemanager.de/ad/?t=c&pl=58c2829beb0a193456047a27&cb=${CACHEBUSTER}&tc=${CLICK_URL_ENC}"> <img src="https://trc.audiencemanager.de/ad/?t=i&pl=58c2829beb0a193456047a27&cb=${CACHEBUSTER}" alt="Click Here" border="0"> </a> </noscript>';
  const CPM = 1;

  // function createBidRequest (paramsToReturn) {
  //   return {
  //     [DATA_PARTNER_PIXEL_ID]: paramsToReturn.includes(DATA_PARTNER_PIXEL_ID) ? DATA_PARTNER_PIXEL_ID_VALUE : null,
  //     [NQ]: paramsToReturn.includes(NQ) ? NQ_VALUE : null,
  //     [NQ_NAME]: paramsToReturn.includes(NQ_NAME) ? NQ_NAME_VALUE : null,
  //     [CATEGORY]: paramsToReturn.includes(CATEGORY) ? CATEGORY_VALUE : null,
  //     [CATEGORY_NAME]: paramsToReturn.includes(CATEGORY_NAME) ? CATEGORY_NAME_VALUE : null,
  //     [SUB_ID]: paramsToReturn.includes(SUB_ID) ? SUB_ID_VALUE : null,
  //   };
  // }

  function getBidResponse (pid, nq, category, subId, cors, ref) {
    return {
      [DATA_PARTNER_PIXEL_ID]: pid,
      [NQ]: nq,
      [CATEGORY]: category,
      [SUB_ID]: subId,
      [REF]: ref,
      [SIZES_PARAM]: [WIDTH1 + 'x' + HEIGHT1, WIDTH2 + 'x' + HEIGHT2],
      [BID_ID_PARAM]: BID_ID_VALUE,
      [CORS_PARAM]: cors,
    };
  }

  function getBidRequest (params) {
    return {
      bidder: BIDDER_CODE,
      params: params,
      placementCode: 'div-gpt-ad-1460505748561-0',
      transactionId: 'ee335735-ddd3-41f2-b6c6-e8aa99f81c0f',
      [SIZES_PARAM]: SIZES_VALUE,
      [BID_ID_PARAM]: BID_ID_VALUE,
      bidderRequestId: '189135372acd55',
      auctionId: 'ac15bb68-4ef0-477f-93f4-de91c47f00a9'
    };
  }

  // const SINGLE_BID_REQUEST = {
  //   [DATA_PARTNER_PIXEL_ID]: 'pid1',
  //   [NQ]: [null],
  //   [CATEGORY]: [null],
  //   [SUB_ID]: null,
  //   sizes: [WIDTH + 'x' + HEIGHT],
  //   bidId: '24a1c9ec270973',
  //   cors: 'http://localhost'
  // };

  // function getSingleBidResponse (isValid) {
  //   return {
  //     id: '24a1c9ec270973',
  //     cpm: isValid === true ? CPM : null,
  //     width: WIDTH1,
  //     height: HEIGHT1,
  //     ad: AD,
  //     ttl: 360,
  //     creativeId: 'TEST_ID',
  //     netRevenue: false,
  //     currency: 'EUR',
  //   };
  // }
  //
  // const VALID_BID = {
  //   requestId: '24a1c9ec270973',
  //   cpm: CPM,
  //   width: WIDTH1,
  //   height: HEIGHT1,
  //   ad: AD,
  //   ttl: 360,
  //   creativeId: 'TEST_ID',
  //   netRevenue: false,
  //   currency: 'EUR',
  // };

  describe('NanoAdapter', () => {
    let nanoBidAdapter = spec;

    describe('Methods', () => {
      it('Test isBidRequestValid() with valid param(s): pid', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq, category', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ,
          [CATEGORY]: CATEGORY_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq, categoryName', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ,
          [CATEGORY_NAME_VALUE]: CATEGORY_NAME_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq, subId', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nqName', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ_NAME]: NQ_NAME_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nqName, category', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ_NAME]: NQ_NAME_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nqName, categoryName', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ_NAME]: NQ_NAME_VALUE,
          [CATEGORY_NAME_VALUE]: CATEGORY_NAME_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nqName, subId', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ_NAME]: NQ_NAME_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, category', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, category, subId', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, subId', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq, category, subId', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nqName, categoryName, subId', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ_NAME]: NQ_NAME_VALUE,
          [CATEGORY_NAME]: CATEGORY_NAME_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq, category, subId, ref (value none)', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
          [REF]: REF_NO_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with valid param(s): pid, nq, category, subId, ref (value other)', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
          [NQ]: NQ_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
          [REF]: REF_OTHER_VALUE,
        }))).to.equal(true);
      });
      it('Test isBidRequestValid() with invalid param(s): empty', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({}))).to.equal(false);
      });
      it('Test isBidRequestValid() with invalid param(s): pid missing', function () {
        expect(nanoBidAdapter.isBidRequestValid(getBidRequest({
          [NQ]: NQ_VALUE,
          [CATEGORY]: CATEGORY_VALUE,
          [SUB_ID]: SUB_ID_VALUE,
        }))).to.equal(false);
      });
      it('Test buildRequests()', function () {
        let mockOriginAddress = 'http://localhost';
        let mockRefAddress = 'http://some-ref.test';
        let stubGetOrigin = sinon.stub(utils, 'getOrigin').callsFake(() => mockOriginAddress);
        let stubGetRefAddress = sinon.stub(utils, 'getTopWindowReferrer').callsFake(() => mockRefAddress);
        let stubGetParameterByName = sinon.stub(utils, 'getParameterByName').callsFake((arg) => {
          switch (arg) {
            case CATEGORY_NAME_VALUE:
              return CATEGORY_VALUE;
            case NQ_NAME_VALUE:
              return NQ_VALUE;
          }
          return null;
        });

        function executeTest (requestParams, expectedPid, expectedNq, expectedCategory, expectedSubId, expectedCors, expectedRef) {
          let request = nanoBidAdapter.buildRequests([
            getBidRequest(requestParams)]);
          expect(request.method).to.equal('POST');
          expect(request.url).to.equal(ENGINE_BASE_URL);
          expect(request.data).to.equal(JSON.stringify([
            getBidResponse(expectedPid, expectedNq, expectedCategory, expectedSubId, expectedCors, expectedRef),
          ]));
        }

        let testParamsArray = [
          // only pid
          {
            requestParams: {
              [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            },
            expectedPid: DATA_PARTNER_PIXEL_ID_VALUE,
            expectedNq: [null],
            expectedCategory: [null],
            expectedSubId: null,
            expectedCors: mockOriginAddress,
            expectedRef: mockRefAddress,
          },
          // pid, nq
          {
            requestParams: {
              [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
              [NQ]: NQ_VALUE,
            },
            expectedPid: DATA_PARTNER_PIXEL_ID_VALUE,
            expectedNq: [NQ_VALUE],
            expectedCategory: [null],
            expectedSubId: null,
            expectedCors: mockOriginAddress,
            expectedRef: mockRefAddress,
          },
          // pid, nq, category
          {
            requestParams: {
              [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
              [NQ]: NQ_VALUE,
              [CATEGORY]: CATEGORY_VALUE,
            },
            expectedPid: DATA_PARTNER_PIXEL_ID_VALUE,
            expectedNq: [NQ_VALUE],
            expectedCategory: [CATEGORY_VALUE],
            expectedSubId: null,
            expectedCors: mockOriginAddress,
            expectedRef: mockRefAddress,
          },
          // pid, nq, categoryName
          {
            requestParams: {
              [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
              [NQ]: NQ_VALUE,
              [CATEGORY_NAME]: CATEGORY_NAME_VALUE,
            },
            expectedPid: DATA_PARTNER_PIXEL_ID_VALUE,
            expectedNq: [NQ_VALUE],
            expectedCategory: [CATEGORY_VALUE],
            expectedSubId: null,
            expectedCors: mockOriginAddress,
            expectedRef: mockRefAddress,
          },
          // pid, nq, subId
          {
            requestParams: {
              [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
              [NQ]: NQ_VALUE,
              [SUB_ID]: SUB_ID_VALUE,
            },
            expectedPid: DATA_PARTNER_PIXEL_ID_VALUE,
            expectedNq: [NQ_VALUE],
            expectedCategory: [null],
            expectedSubId: SUB_ID_VALUE,
            expectedCors: mockOriginAddress,
            expectedRef: mockRefAddress,
          },
          {
            requestParams: {

            },
            expectedPid: DATA_PARTNER_PIXEL_ID_VALUE,
            expectedNq: [NQ_VALUE],
            expectedCategory: [null],
            expectedSubId: null,
            expectedCors: mockOriginAddress,
            expectedRef: mockRefAddress,
          },
        ];

        for (let i = 0; i < testParamsArray.length; i++) {
          executeTest(
            testParamsArray[i].requestParams,
            testParamsArray[i].expectedPid,
            testParamsArray[i].expectedNq,
            testParamsArray[i].expectedCategory,
            testParamsArray[i].expectedSubId,
            testParamsArray[i].expectedCors,
            testParamsArray[i].expectedRef,
          );
        }

        // pid, nqName
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ_NAME]: NQ_NAME_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [null], null, mockOriginAddress, mockRefAddress),
        ]));

        // pid, nqName, category
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ_NAME]: NQ_NAME_VALUE,
            [CATEGORY]: CATEGORY_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [CATEGORY_VALUE], null, mockOriginAddress, mockRefAddress),
        ]));

        // pid, nqName, categoryName
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ_NAME]: NQ_NAME_VALUE,
            [CATEGORY_NAME]: CATEGORY_NAME_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [CATEGORY_VALUE], null, mockOriginAddress, mockRefAddress),
        ]));

        // pid, nqName, subId
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ_NAME]: NQ_NAME_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [null], SUB_ID_VALUE, mockOriginAddress, mockRefAddress),
        ]));

        // pid, category
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [CATEGORY]: CATEGORY_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [null], [CATEGORY_VALUE], null, mockOriginAddress, mockRefAddress),
        ]));

        // pid, category, subId
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [CATEGORY]: CATEGORY_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [null], [CATEGORY_VALUE], SUB_ID_VALUE, mockOriginAddress, mockRefAddress),
        ]));

        // pid, subId
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [null], [null], SUB_ID_VALUE, mockOriginAddress, mockRefAddress),
        ]));

        // pid, nq, category, subId
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ]: NQ_VALUE,
            [CATEGORY]: CATEGORY_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [CATEGORY_VALUE], SUB_ID_VALUE, mockOriginAddress, mockRefAddress),
        ]));

        // pid, nqName, categoryName, subId
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ_NAME]: NQ_NAME_VALUE,
            [CATEGORY_NAME]: CATEGORY_NAME_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [CATEGORY_VALUE], SUB_ID_VALUE, mockOriginAddress, mockRefAddress),
        ]));

        // pid, nq, category, subId, ref (value none)
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ]: NQ_VALUE,
            [CATEGORY]: CATEGORY_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
            [REF]: REF_NO_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [CATEGORY_VALUE], SUB_ID_VALUE, mockOriginAddress, null),
        ]));

        // pid, nq, category, subId, ref (value other)
        request = nanoBidAdapter.buildRequests([
          getBidRequest({
            [DATA_PARTNER_PIXEL_ID]: DATA_PARTNER_PIXEL_ID_VALUE,
            [NQ]: NQ_VALUE,
            [CATEGORY]: CATEGORY_VALUE,
            [SUB_ID]: SUB_ID_VALUE,
            [REF]: REF_OTHER_VALUE,
          }),]);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(ENGINE_BASE_URL);
        expect(request.data).to.equal(JSON.stringify([
          getBidResponse(DATA_PARTNER_PIXEL_ID_VALUE, [NQ_VALUE], [CATEGORY_VALUE], SUB_ID_VALUE, mockOriginAddress, null),
        ]));

        stubGetParameterByName.restore();
        stubGetRefAddress.restore();
        stubGetOrigin.restore();
      });
      // it('Test interpretResponse() length', function () {
      //   let bids = nanoBidAdapter.interpretResponse({body: [getSingleBidResponse(true), getSingleBidResponse(false)]});
      //   expect(bids.length).to.equal(1);
      // });
      // it('Test interpretResponse() bids', function () {
      //   let bid = nanoBidAdapter.interpretResponse({body: [getSingleBidResponse(true), getSingleBidResponse(false)]})[0];
      //   expect(bid.requestId).to.equal(VALID_BID.requestId);
      //   expect(bid.cpm).to.equal(VALID_BID.cpm);
      //   expect(bid.width).to.equal(VALID_BID.width);
      //   expect(bid.height).to.equal(VALID_BID.height);
      //   expect(bid.ad).to.equal(VALID_BID.ad);
      //   expect(bid.ttl).to.equal(VALID_BID.ttl);
      //   expect(bid.creativeId).to.equal(VALID_BID.creativeId);
      //   expect(bid.currency).to.equal(VALID_BID.currency);
      // });
    });
  });
});
