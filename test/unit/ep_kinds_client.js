import { Hub, expect, newLog } from './_setup'

describe @ 'ep_kinds.client', @=> ::
  var hub, log
  beforeEach @=> ::
    hub = Hub.create('$unit$')
    log = newLog()

  describe @ 'flow', @=> ::
    it @ 'normal client init', @=>> ::
      const tgt = hub.endpoint.client @=> ::
        log @ 'client'

      log @ 'ep_created'

      expect(log.calls)
      .to.deep.equal @#
        'ep_created'

      await tgt

      expect(log.calls)
      .to.deep.equal @#
        'ep_created'
        'client'


    it @ 'async client init', @=>> ::
      const tgt = hub.endpoint.client @=>> ::
        log @ 'client 0'
        await 0
        log @ 'client 1'

      log @ 'ep_created'

      expect(log.calls)
      .to.deep.equal @#
        'ep_created'

      await tgt

      expect(log.calls)
      .to.deep.equal @#
        'ep_created'
        'client 0'
        'client 1'
