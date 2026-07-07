import React from 'react';
import {
  terrestrial,
  terrestrialChannelsDecJan,
  terrestrialChannelsFeb,
  terrestrialChannelsMar,
  terrestrialChannelsApr,
  terrestrialChannelsMay,
  terrestrialChannelsJun,
  terrestrialProgramsDecJan,
  terrestrialProgramsFeb,
  terrestrialProgramsMar,
  terrestrialProgramsApr,
  terrestrialProgramsMay,
  terrestrialProgramsJun,
} from './campaignData';

const PERIOD_ORDER = ['decjan', 'feb', 'mar', 'apr', 'may', 'jun'];

const PERIOD_META = {
  decjan: { label: 'Dec/Jan 2026', short: 'Dec/Jan', note: 'This window covers two months, so volume metrics will look heavier than any single month that follows.' },
  feb: { label: 'February 2026', short: 'February' },
  mar: { label: 'March 2026', short: 'March' },
  apr: { label: 'April 2026', short: 'April' },
  may: { label: 'May 2026', short: 'May' },
  jun: { label: 'June 2026', short: 'June' },
};

const terrChannelsByPeriod = {
  decjan: terrestrialChannelsDecJan,
  feb: terrestrialChannelsFeb,
  mar: terrestrialChannelsMar,
  apr: terrestrialChannelsApr,
  may: terrestrialChannelsMay,
  jun: terrestrialChannelsJun,
};

const terrProgramsByPeriod = {
  decjan: terrestrialProgramsDecJan,
  feb: terrestrialProgramsFeb,
  mar: terrestrialProgramsMar,
  apr: terrestrialProgramsApr,
  may: terrestrialProgramsMay,
  jun: terrestrialProgramsJun,
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

function topChannels(periodId, n = 4) {
  return [...terrChannelsByPeriod[periodId]].sort((a, b) => b.tvr - a.tvr).slice(0, n);
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

const PERIOD_INSIGHTS = {
  reachHouseholds(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          In {meta.short}, we reached about {t.householdsReachedM}M households at {t.avgFrequency.toFixed(1)}× average frequency
          on {t.spots.toLocaleString()} spots. Total TVR for the month is {t.totalTVR.toLocaleString(undefined, { maximumFractionDigits: 1 })}.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          const dt = pctDelta(prev.t.householdsReachedM, curr.t.householdsReachedM);
          return `Compared with ${priorShort}: reach ${dt}.`;
        })}
        {period === 'decjan' && <p>{PERIOD_META.decjan.note}</p>}
        {period === 'may' && (
          <p>
            May is our peak month: 51.8M reach and 5,466 TVR — lifted by election-season news consumption on NTA, Arise, and Channels.
          </p>
        )}
        {period === 'jun' && (
          <p>
            June stepped down to 20M reach on 666 spots — a narrower channel set (CNN, Zee, Trace, ROK, SuperSport) as inventory depleted.
            That is expected, not a reporting error.
          </p>
        )}
      </>
    );
  },

  reachSharePie(period) {
    const top = topChannels(period, 5);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          Reach weight in {meta.short} clusters on {top.map((c) => c.channel).join(', ')}.
          {period === 'jun'
            ? ' With news channels off-air, entertainment and sport drivers carry the household impacts.'
            : ' NTA and the news tier still do the heavy lifting when they are on the plan.'}
        </p>
      </>
    );
  },

  reachSpotsFreq(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          {meta.short}: {t.spots.toLocaleString()} spots at {t.avgFrequency.toFixed(1)}× average frequency.
          TVR is {t.totalTVR.toLocaleString(undefined, { maximumFractionDigits: 1 })}.
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          if (curr.t.spots < prev.t.spots && curr.t.avgFrequency > prev.t.avgFrequency) {
            return `Fewer spots than ${priorShort} but higher frequency — pressing harder per placement.`;
          }
          const dt = pctDelta(prev.t.spots, curr.t.spots);
          const df = pctDelta(prev.t.avgFrequency, curr.t.avgFrequency);
          return `Versus ${priorShort}: spots ${dt}, frequency ${df}.`;
        })}
      </>
    );
  },

  topChannelsTerrestrial(period) {
    const top = topChannels(period, 4);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          {meta.short} is led by {top.map((ch) => `${ch.channel} (${ch.tvr.toFixed(0)} TVR)`).join(', ')}.
          {period === 'jun'
            ? ' CNN and SuperSport Blitz (World Cup) are doing the heavy TVR work alongside Zee, Trace, and ROK.'
            : ' News and current-affairs channels anchor credibility; entertainment and sport stretch us into other dayparts.'}
        </p>
        {priorSentence(period, (prev, curr, priorShort) => {
          const lead = topChannels(period, 1)[0];
          const prevLead = topChannels(priorPeriod(period), 1)[0];
          if (lead.channel === prevLead.channel) {
            return `${lead.channel} was also top in ${priorShort}; TVR moved from ${prevLead.tvr.toFixed(0)} to ${lead.tvr.toFixed(0)}.`;
          }
          return `Top channel shifted from ${prevLead.channel} in ${priorShort} to ${lead.channel} now.`;
        })}
      </>
    );
  },

  topChannelsTerrestrialPie(period) {
    const top = topChannels(period, 5);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          The top five TVR share in {meta.short} clusters around {top.map((c) => c.channel).join(', ')}.
          {period === 'jun'
            ? ' A focused roster by design — the channels that still move TVR when premium news inventory is gone.'
            : ' Healthy concentration: budget is not spread across too many middling channels.'}
        </p>
        {period !== 'jun' && (
          <p>Protect news and current-affairs slots first; use ROS and sponsorship on ROK, SuperSport, and Arewa for efficient cover.</p>
        )}
      </>
    );
  },

  audienceOverviewGender(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          Demographics here are structural, but delivery intensity shifts by month.
          In {meta.short} we had {t.spots.toLocaleString()} spots in market across news, drama, and sport environments.
        </p>
        <p>That matters for Payment Shield: men often initiate the download; women often gate trust in the household.</p>
      </>
    );
  },

  audienceOverviewAge(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          The sweet spot is still 25–44: CNN, Channels, Trace, ROK, and sport keep us in front of mobile-money users.
          In {meta.short}, frequency at {t.avgFrequency.toFixed(1)}× means we are past awareness and into recall.
        </p>
      </>
    );
  },

  audienceOverviewTime(period) {
    const { t, meta } = metrics(period);
    return (
      <>
        <p>
          Daypart logic for {meta.short}: mornings for credibility, primetime for family, late night for attentive news processing.
          With {t.spots.toLocaleString()} spots on air, we cover the blocks that match our remaining inventory.
        </p>
        <p>CNN still peaks 21:00–23:00 — our best trust-conversion real estate on news.</p>
      </>
    );
  },

  audienceChannelDetail(period) {
    const { meta } = metrics(period);
    return (
      <>
        <p>
          Use this drill-down for {meta.short}: news channels skew slightly older and more male; drama and ROK skew female; sport skews male and younger.
        </p>
      </>
    );
  },

  topProgramsTable(period) {
    const top = topPrograms(period, 3);
    const { meta } = metrics(period);
    return (
      <>
        <p>
          Program standouts in {meta.short} by TVR: {top.map((p) => `${p.channel} (${p.totalTVR.toFixed(0)} TVR)`).join('; ')}.
        </p>
        {period === 'jun' ? (
          <p>
            June is a slimmed flight: Trace Naija sponsorship is new; CNN tactical and SuperSport Blitz (World Cup) carry news and sport dayparts.
          </p>
        ) : (
          <p>Arise Morning Show, NTA news belts, and CNN tactical anchor credibility; ROS and sport blocks fill the gaps.</p>
        )}
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
          CNN peaks late evening when news viewers are most locked in.
          {cnn ? ` CNN tactical ran ${cnn.insertions} insertions at ${cnn.totalTVR.toFixed(0)} TVR in ${meta.short}.` : ''}
        </p>
        {period !== 'decjan' && priorSentence(period, (prev, curr, priorShort) => {
          const prevCnn = terrProgramsByPeriod[priorPeriod(period)]?.find((p) => p.channel === 'CNN');
          const currCnn = terrProgramsByPeriod[period]?.find((p) => p.channel === 'CNN');
          if (prevCnn && currCnn) {
            return `CNN TVR: ${prevCnn.totalTVR.toFixed(0)} (${priorShort}) → ${currCnn.totalTVR.toFixed(0)} (${meta.short}).`;
          }
          return null;
        })}
      </>
    );
  },
};

const STATIC_INSIGHTS = {
  campaignOverviewTerrestrial: (
    <>
      <p>
        We opened at 29.6M households (Dec/Jan), built through 41M (Feb), 45M (Mar), 47M (Apr), peaked at 51.8M in May, then stepped down to 20M in June as spots depleted.
        TVR: 2,175 → 3,487 → 4,134 → 4,753 → 5,466 → 2,554.
      </p>
      <p>
        May was the high-water mark — 985 spots, 26.5× frequency, election-season news lift.
        June is lighter (666 spots) on CNN, Zee, Trace, ROK, and SuperSport as inventory runs down.
      </p>
      <p>
        Roughly two-thirds of spend sits in premium news and current affairs when that inventory is available; ROS and sponsorship fill the gaps.
      </p>
    </>
  ),

  growthHouseholdReach: (
    <>
      <p>
        Reach climbed every month through May (29.6M → 51.8M), then fell in June (20M) as spots and channel mix narrowed.
      </p>
      <p>
        The June step-down is inventory-driven: fewer spots, focus on the channels that still move TVR (CNN, Zee, Trace, ROK, SuperSport).
      </p>
    </>
  ),

  growthSpots: (
    <>
      <p>
        Spots peaked in May (985), then eased to 666 in June. Frequency rose through May (26.5×) before easing in June (19.4×).
      </p>
      <p>
        The rhythm: build through spring, peak in May on news lift, then run the remaining entertainment and sport inventory into June.
      </p>
    </>
  ),

  campaignProgression: (
    <>
      <p>
        Six stops: Dec/Jan → Feb → Mar → Apr → May → Jun. Use raw totals first; flip monthly-normalized for a fair pace read on spots and TVR.
      </p>
      <p>
        Reach: 29.6M → 41M → 45M → 47M → 51.8M → 20M. May→Jun is a deliberate decline as inventory depletes — not creative fatigue.
      </p>
      <p>
        Tags use fixed rules (declining / accelerating / softening / stable). A sharp May→Jun drop is expected once spots run out.
      </p>
    </>
  ),
};

export function getPeriodInsight(key, periodId) {
  const builder = PERIOD_INSIGHTS[key];
  if (!builder) return null;
  return builder(periodId);
}

export function getStaticInsight(key) {
  return STATIC_INSIGHTS[key];
}

export const INSIGHTS = {
  ...STATIC_INSIGHTS,
  ...Object.fromEntries(Object.keys(PERIOD_INSIGHTS).map((k) => [k, PERIOD_INSIGHTS[k]('jun')])),
};
