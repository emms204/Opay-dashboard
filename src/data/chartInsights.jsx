import React from 'react';
import {
  terrestrial,
  cable,
  dstv,
  gotv,
  terrestrialChannelsDecJan,
  terrestrialChannelsFeb,
  terrestrialChannelsMar,
  terrestrialChannelsApr,
  cableChannelsDecJan,
  cableChannelsFeb,
  cableChannelsMar,
  cableChannelsApr,
  terrestrialProgramsDecJan,
  terrestrialProgramsFeb,
  terrestrialProgramsMar,
  terrestrialProgramsApr,
} from './campaignData';

const PERIOD_ORDER = ['decjan', 'feb', 'mar', 'apr'];

const PERIOD_META = {
  decjan: { label: 'Dec/Jan 2026', short: 'Dec/Jan', note: 'This window covers two months, so volume metrics will look heavier than any single month that follows.' },
  feb: { label: 'February 2026', short: 'February' },
  mar: { label: 'March 2026', short: 'March' },
  apr: { label: 'April 2026', short: 'April' },
};

const terrChannelsByPeriod = {
  decjan: terrestrialChannelsDecJan,
  feb: terrestrialChannelsFeb,
  mar: terrestrialChannelsMar,
  apr: terrestrialChannelsApr,
};

const cableChannelsByPeriod = {
  decjan: cableChannelsDecJan,
  feb: cableChannelsFeb,
  mar: cableChannelsMar,
  apr: cableChannelsApr,
};

const terrProgramsByPeriod = {
  decjan: terrestrialProgramsDecJan,
  feb: terrestrialProgramsFeb,
  mar: terrestrialProgramsMar,
  apr: terrestrialProgramsApr,
};

function dataKey(periodId) {
  return periodId === 'decjan' ? 'decJan' : periodId;
}

function priorPeriod(periodId) {
  const i = PERIOD_ORDER.indexOf(periodId);
  return i > 0 ? PERIOD_ORDER[i - 1] : null;
}

function metrics(periodId) {
  const key = dataKey(periodId);
  return {
    t: terrestrial[key],
    c: cable[key],
    d: dstv[key],
    g: gotv[key],
    meta: PERIOD_META[periodId],
    priorId: priorPeriod(periodId),
  };
}

function pctDelta(prev, curr) {
  if (prev == null || prev === 0) return null;
  const n = ((curr - prev) / prev) * 100;
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

function topChannels(periodId, platform, n = 4) {
  const list = platform === 'terrestrial' ? terrChannelsByPeriod[periodId] : cableChannelsByPeriod[periodId];
  return [...list].sort((a, b) => b.tvr - a.tvr).slice(0, n);
}

function topPrograms(periodId, n = 3) {
  return [...terrProgramsByPeriod[periodId]].sort((a, b) => b.totalTVR - a.totalTVR).slice(0, n);
}

function priorSentence(periodId, formatter) {
  const prior = priorPeriod(periodId);
  if (!prior) return null;
  const curr = metrics(periodId);
  const prev = metrics(prior);
  const text = formatter(prev, curr, PERIOD_META[prior].short);
  return text ? <p>{text}</p> : null;
}

// ——— Period-specific (dropdown pages) ———

const PERIOD_INSIGHTS = {
  reachHouseholds(period) {
    const { t, c, meta } = metrics(period);
    const combined = (t.householdsReachedM + c.householdsReachedM).toFixed(1);
    const terrShare = Math.round((t.householdsReachedM / (t.householdsReachedM + c.householdsReachedM)) * 100);
    return (
      <>
        <p>
          In {meta.short}, terrestrial reached about {t.householdsReachedM}M households and cable about {c.householdsReachedM}M —
          roughly {combined}M combined. Terrestrial is carrying about {terrShare}% of that pool, which is what we want for a broad national trust message.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          const dt = pctDelta(prev.t.householdsReachedM, curr.t.householdsReachedM);
          const dc = pctDelta(prev.c.householdsReachedM, curr.c.householdsReachedM);
          return `Compared with ${priorShort}: terrestrial ${dt}, cable ${dc}.`;
        })}
        {period === 'decjan' && <p>{PERIOD_META.decjan.note}</p>}
        {period === 'apr' && (
          <p>
            April is our strongest terrestrial reach month so far. Cable eased a touch from March but is still ahead of where we opened the flight — so the pay-TV layer is holding, not slipping away.
          </p>
        )}
      </>
    );
  },

  reachSharePie(period) {
    const { t, c, meta } = metrics(period);
    const terrShare = Math.round((t.householdsReachedM / (t.householdsReachedM + c.householdsReachedM)) * 100);
    return (
      <>
        <p>
          The split you are looking at for {meta.short} is roughly {terrShare}% terrestrial and {100 - terrShare}% cable by household reach.
          That is intentional: FTA gives us scale and repetition; cable gives us depth in subscription homes.
        </p>
        <p>
          Most of our terrestrial spend still sits in premium news and current-affairs environments, with ROS and sponsorship filling the gaps.
          That mix is what lets us look “national” without giving up credibility.
        </p>
      </>
    );
  },

  reachSpotsFreq(period) {
    const { t, c, meta } = metrics(period);
    return (
      <>
        <p>
          {meta.short}: {t.spots.toLocaleString()} terrestrial spots at {t.avgFrequency.toFixed(1)}× average frequency, and {c.spots.toLocaleString()} cable spots at {c.avgFrequency.toFixed(1)}×.
          Terrestrial TVR for the month is {t.totalTVR.toLocaleString(undefined, { maximumFractionDigits: 1 })}; cable GRPs are {c.grps.toLocaleString()}.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          if (curr.t.spots < prev.t.spots && curr.t.avgFrequency > prev.t.avgFrequency) {
            return `Terrestrial ran fewer spots than ${priorShort} but frequency went up — so we are pressing harder per placement, not just buying more airtime.`;
          }
          if (curr.c.spots < prev.c.spots && curr.c.householdsReachedM >= prev.c.householdsReachedM * 0.98) {
            return `Cable trimmed spots versus ${priorShort} while keeping reach in the same ballpark — tighter scheduling, not a pullback from the audience.`;
          }
          return `Versus ${priorShort}, terrestrial frequency moved from ${prev.t.avgFrequency.toFixed(1)}× to ${curr.t.avgFrequency.toFixed(1)}×.`;
        })}
      </>
    );
  },

  dstvGotvBar(period) {
    const { d, g, meta } = metrics(period);
    const leader = d.householdsReachedM >= g.householdsReachedM ? 'DStv' : 'GOtv';
    return (
      <>
        <p>
          For {meta.short}, DStv delivered {d.householdsReachedM}M households, {d.totalTVR.toFixed(1)} TVR, and {d.avgFrequency.toFixed(1)}× frequency.
          GOtv delivered {g.householdsReachedM}M households, {g.totalTVR.toFixed(1)} TVR, and {g.avgFrequency.toFixed(1)}×.
        </p>
        <p>
          {leader} leads on reach this month. DStv tends to win on TVR and frequency when we need depth; GOtv helps us stay present in more homes at a lighter cost per touch.
          We use both on purpose — they are not interchangeable.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          const dReach = pctDelta(prev.d.householdsReachedM, curr.d.householdsReachedM);
          const gReach = pctDelta(prev.g.householdsReachedM, curr.g.householdsReachedM);
          return `Reach vs ${priorShort}: DStv ${dReach}, GOtv ${gReach}.`;
        })}
      </>
    );
  },

  dstvGotvReachShare(period) {
    const { d, g, meta } = metrics(period);
    const total = d.householdsReachedM + g.householdsReachedM;
    const dstvPct = Math.round((d.householdsReachedM / total) * 100);
    return (
      <>
        <p>
          In {meta.short}, DStv accounts for about {dstvPct}% of cable household reach and GOtv about {100 - dstvPct}%.
          When that line shifts month to month, it is usually inventory and football/drama weighting — not audience fatigue.
        </p>
        {period === 'apr' && (
          <p>GOtv edges ahead on reach in April while DStv still carries the heavier TVR load. That is a useful balance: breadth plus depth in the same month.</p>
        )}
      </>
    );
  },

  dstvGotvRadial(period) {
    const { t, c, meta } = metrics(period);
    return (
      <>
        <p>
          This view scales reach against a 40M reference line for {meta.short}. Terrestrial is at {t.householdsReachedM}M — above that benchmark — and cable is at {c.householdsReachedM}M.
        </p>
        <p>
          Read the overshoot as maturity on FTA, not as “we have run out of room.” From here, gains are more about how often people see us and in what context, not simply adding another million on the chart.
        </p>
      </>
    );
  },

  topChannelsTerrestrial(period) {
    const top = topChannels(period, 'terrestrial', 4);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          {meta.short} is led by {top.map((ch, i) => `${ch.channel} (${ch.tvr.toFixed(0)} TVR)`).join(', ')}.
          NTA and the news tier are doing the heavy lifting; entertainment and sports are stretching us into other dayparts.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          const lead = topChannels(period, 'terrestrial', 1)[0];
          const prevLead = topChannels(priorPeriod(period), 'terrestrial', 1)[0];
          if (lead.channel === prevLead.channel) {
            return `${lead.channel} was also our top terrestrial channel in ${priorShort}; TVR moved from ${prevLead.tvr.toFixed(0)} to ${lead.tvr.toFixed(0)}.`;
          }
          return `Top channel shifted from ${prevLead.channel} in ${priorShort} to ${lead.channel} now.`;
        })}
      </>
    );
  },

  topChannelsTerrestrialPie(period) {
    const top = topChannels(period, 'terrestrial', 5);
    const { meta } = metrics(period);
    const names = top.map((c) => c.channel).join(', ');
    return (
      <>
        <p>
          The top five TVR share in {meta.short} clusters around {names}. That concentration is healthy: we are not spreading budget across too many middling channels.
        </p>
        <p>Protect those news and current-affairs slots first; use ROS and sponsorship on ROK, SuperSport, and Arewa when we need extra cover without paying full network premiums.</p>
      </>
    );
  },

  topChannelsCable(period) {
    const top = topChannels(period, 'cable', 4);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          Cable in {meta.short} is still a story about Africa Magic and sport: {top.map((ch) => `${ch.platform} ${ch.channel} (${ch.tvr.toFixed(0)} TVR)`).join('; ')}.
        </p>
        <p>That is the right neighbourhood for OPay — high-attention drama and football, repeated often enough to stick without feeling like wallpaper.</p>
      </>
    );
  },

  topChannelsCablePie(period) {
    const top = topChannels(period, 'cable', 5);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          In {meta.short}, most of our cable TVR weight still sits in a handful of channels — mainly Africa Magic across DStv and GOtv, with football adding spikes when it is on the schedule.
        </p>
        <p>If we need to trim GRPs in a softer month, this is where we can do it surgically without losing the whole pay-TV presence.</p>
      </>
    );
  },

  audienceOverviewGender(period) {
    const { t, c, meta } = metrics(period);
    return (
      <>
        <p>
          Demographics here are structural (they do not flip when you change the month), but delivery intensity does.
          In {meta.short} we had {t.spots.toLocaleString()} terrestrial and {c.spots.toLocaleString()} cable spots in market — so both male-leaning sport/news and female-leaning drama environments got real pressure.
        </p>
        <p>That matters for Payment Shield: men often initiate the download; women often gate trust in the household. We need both.</p>
      </>
    );
  },

  audienceOverviewAge(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          The sweet spot is still 25–44: CNN, Channels, Trace, ROK, and sport keep us in front of people who actually use mobile money daily.
          In {meta.short}, terrestrial frequency at {t.avgFrequency.toFixed(1)}× means we are past “they have heard of us” and into “they can recall the claim.”
        </p>
        <p>Older viewers come through NTA and evening news; younger ones through Trace and SuperSport. We are not over-indexed on one age band.</p>
      </>
    );
  },

  audienceOverviewTime(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          Daypart logic for {meta.short} is unchanged in shape: mornings for credibility (Arise, CNN), midday for mass and youth, primetime for family, late night for low-distraction news.
          With {t.spots.toLocaleString()} terrestrial spots on air, we are covering all four blocks — not just buying the cheapest ROS.
        </p>
        <p>CNN still peaks in the 21:00–23:00 window. That is where we get the most attentive processing of a trust message, so we should keep defending it in the plan.</p>
      </>
    );
  },

  audienceChannelDetail(period) {
    const { meta } = metrics(period);
    return (
      <>
        <p>
          Use this drill-down for {meta.short} to sanity-check fit: news channels should skew slightly older and more male; drama and ROK skew female; sport skews male and younger.
        </p>
        <p>If a channel’s curve looks flat while its TVR is high, we are probably reaching people often but not at the moments they are most attentive — worth a scheduling conversation, not a budget cut.</p>
      </>
    );
  },

  topProgramsTable(period) {
    const top = topPrograms(period, 3);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          Program view for {meta.short} — the standouts by TVR: {top.map((p) => `${p.channel} (${p.totalTVR.toFixed(0)} TVR)`).join('; ')}.
        </p>
        <p>
          Arise Morning Show, NTA news belts, and CNN tactical still anchor credibility. ROS on Arewa and tactical sport blocks give us efficient reach between those premium anchors.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          const now = topPrograms(period, 1)[0];
          const before = topPrograms(priorPeriod(period), 1)[0];
          return `Top program TVR vs ${priorShort}: ${before.channel} ${before.totalTVR.toFixed(0)} → ${now.channel} ${now.totalTVR.toFixed(0)}.`;
        })}
      </>
    );
  },

  topProgramsHeatmap(period) {
    const cnn = terrProgramsByPeriod[period].find((p) => p.channel === 'CNN');
    const { meta } = metrics(period);
    return (
      <>
        <p>
          The CNN heatmap for {meta.short} is still telling the same story: late evening is when news viewers are most locked in.
          {cnn ? ` CNN tactical ran ${cnn.insertions} insertions at ${cnn.totalTVR.toFixed(0)} TVR this month.` : ''}
        </p>
        <p>21:00–23:00 is our best trust-conversion real estate on cable news. Daytime CNN adds frequency; late night adds belief.</p>
        {period !== 'decjan' && priorSentence(period, (prev, curr, priorShort) => {
          const prevCnn = terrProgramsByPeriod[priorPeriod(period)].find((p) => p.channel === 'CNN');
          const currCnn = terrProgramsByPeriod[period].find((p) => p.channel === 'CNN');
          if (prevCnn && currCnn) {
            return `CNN TVR moved ${prevCnn.totalTVR.toFixed(0)} (${priorShort}) → ${currCnn.totalTVR.toFixed(0)} (${meta.short}).`;
          }
          return null;
        })}
      </>
    );
  },
};

// ——— Static (multi-period pages, no dropdown) ———

const STATIC_INSIGHTS = {
  campaignOverviewTerrestrial: (
    <>
      <p>
        Terrestrial is the engine of this flight. We opened at 29.6M households (Dec/Jan), pushed to 41M in February, 45M in March, and 47M in April.
        TVR followed the same staircase: about 2,175 → 3,487 → 4,134 → 4,753.
      </p>
      <p>
        April is especially interesting: spots dipped to 1,006 while frequency rose to 23.1×. We are getting more repetition without simply buying more airtime — that is better planning, not less effort.
      </p>
      <p>
        A lot of this delivery rides on simulcast and on the DTH/DTT feed work we negotiated — exposure we would not have got from a standard buy alone.
        Roughly two-thirds of spend still sits in premium news and current affairs; the rest is ROS and sponsorship for cover and efficiency.
      </p>
    </>
  ),

  campaignOverviewCable: (
    <>
      <p>
        Cable’s job is precision, not raw scale. Reach went 20.1M → 21.2M → 22.1M → 21.5M; GRPs are 2,564 in April with 8.8× frequency.
        April is a lighter month than March on spots and GRPs — that reads as a planned ease-off, not a problem.
      </p>
      <p>
        Terrestrial is doing the loud national work in April; cable keeps OPay in subscription drama and sport where wallet behaviour actually happens.
        Together they still put us in national-advertiser territory.
      </p>
    </>
  ),

  growthHouseholdReach: (
    <>
      <p>
        The line tells a simple story: terrestrial keeps climbing every period; cable steps up through March and holds most of that gain in April.
      </p>
      <p>
        Terrestrial added about 17.4M households from Dec/Jan to April. Cable added about 1.4M — smaller in absolute terms, but exactly what we need for depth in pay-TV homes.
      </p>
    </>
  ),

  growthSpots: (
    <>
      <p>
        Spots show the rhythm of the flight: build in Feb, peak pressure in March, optimise in April on terrestrial (fewer spots, higher frequency and TVR).
        Cable spots trend down in April while reach stays respectable — we are maintaining presence, not chasing volume for its own sake.
      </p>
      <p>
        Premium inventory still earns the surcharge because it concentrates audience; ROS and sponsorship stop the plan from becoming too expensive to scale nationally.
      </p>
    </>
  ),

  campaignProgression: (
    <>
      <p>
        This page is the journey, not the headline. Four stops: Dec/Jan → Feb → Mar → Apr. Use raw totals first (what actually went to air); flip monthly-normalized when you want a fair pace read on spots and TVR.
      </p>
      <p>
        Terrestrial reach: 29.6M → 41M → 45M → 47M (+58.8% net). Frequency: 9.2× → 23.1×. April cut spots but grew TVR — quality improved.
        Cable reach peaked in March; April is a touch softer but still above Dec/Jan. Cable is now a sustain layer; terrestrial is where growth and repetition live.
      </p>
      <p>
        Tags on each card use fixed rules (declining / accelerating / softening / stable) so small wiggles are not over-called.
        If step three is positive but smaller than step two, that is usually scale maturity on FTA, not campaign fatigue.
      </p>
    </>
  ),
};

/** Insights for pages with a period dropdown — content follows the selected month. */
export function getPeriodInsight(key, periodId) {
  const builder = PERIOD_INSIGHTS[key];
  if (!builder) return null;
  return builder(periodId);
}

/** Insights for overview, growth, and progression — fixed multi-period narrative. */
export function getStaticInsight(key) {
  return STATIC_INSIGHTS[key];
}

/** @deprecated Use getPeriodInsight / getStaticInsight — kept for gradual migration */
export const INSIGHTS = {
  ...STATIC_INSIGHTS,
  ...Object.fromEntries(Object.keys(PERIOD_INSIGHTS).map((k) => [k, PERIOD_INSIGHTS[k]('apr')])),
};
