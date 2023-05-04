import { strokeWidth } from '@/utils/constants';

export default function Squiggle({ fill }: { fill: string }) {
  return (
    <svg
      width="98"
      height="157"
      viewBox="0 0 98 157"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M93.5 42C91 -7.65386 7 0.50005 7 20C7 39.4999 41.5 22.4999 41.5 48C41.5 73.5001 4.5 62.5002 4.5 112C4.5 161.5 90 159.346 90 136.5C90 113.654 56.5 137.049 56.5 108.549C56.5 80.0489 93.5 97 93.5 42Z"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {fill === 'hatched' && (
        <>
          <line
            x1="95.0567"
            y1="32.2437"
            x2="32.6739"
            y2="144.013"
            strokeWidth={strokeWidth}
          />
          <line
            x1="90.461"
            y1="28.2437"
            x2="27.1034"
            y2="141.759"
            strokeWidth={strokeWidth}
          />
          <line
            x1="87.461"
            y1="22.2437"
            x2="21.1792"
            y2="140.999"
            strokeWidth={strokeWidth}
          />
          <line
            x1="85.461"
            y1="15.2437"
            x2="18.2045"
            y2="135.745"
            strokeWidth={strokeWidth}
          />
          <line
            x1="80.461"
            y1="13.2437"
            x2="14.1792"
            y2="131.999"
            strokeWidth={strokeWidth}
          />
          <line
            x1="75.4368"
            y1="11.2434"
            x2="7.81835"
            y2="132.603"
            strokeWidth={strokeWidth}
          />
          <line
            x1="70.4368"
            y1="8.24334"
            x2="7.20466"
            y2="121.745"
            strokeWidth={strokeWidth}
          />
          <line
            x1="65.437"
            y1="5.2429"
            x2="5.05329"
            y2="113.885"
            strokeWidth={strokeWidth}
          />
          <line
            x1="59.4372"
            y1="4.24261"
            x2="39.0933"
            y2="40.9025"
            strokeWidth={strokeWidth}
          />
          <line
            x1="53.4353"
            y1="3.24598"
            x2="36.4524"
            y2="33.3007"
            strokeWidth={strokeWidth}
          />
          <line
            x1="47.4347"
            y1="3.24708"
            x2="29.5023"
            y2="34.7946"
            strokeWidth={strokeWidth}
          />
          <line
            x1="41.4343"
            y1="2.2478"
            x2="23.361"
            y2="33.9221"
            strokeWidth={strokeWidth}
          />
          <line
            x1="33.4363"
            y1="4.24419"
            x2="18.8208"
            y2="30.3585"
            strokeWidth={strokeWidth}
          />
          <line
            x1="26.4402"
            y1="4.23712"
            x2="13.1912"
            y2="28.8331"
            strokeWidth={strokeWidth}
          />
          <line
            x1="87.4378"
            y1="125.241"
            x2="71.7076"
            y2="153.76"
            strokeWidth={strokeWidth}
          />
          <line
            x1="81.4363"
            y1="124.244"
            x2="67.2187"
            y2="149.636"
            strokeWidth={strokeWidth}
          />
          <line
            x1="75.437"
            y1="124.243"
            x2="60.7753"
            y2="150.606"
            strokeWidth={strokeWidth}
          />
          <line
            x1="68.4398"
            y1="124.238"
            x2="53.9298"
            y2="151.079"
            strokeWidth={strokeWidth}
          />
          <line
            x1="63.4359"
            y1="122.245"
            x2="46.6153"
            y2="152.184"
            strokeWidth={strokeWidth}
          />
          <line
            x1="59.4359"
            y1="119.245"
            x2="39.8175"
            y2="154.155"
            strokeWidth={strokeWidth}
          />
          <line
            x1="91.0543"
            y1="50.245"
            x2="71.4359"
            y2="85.1555"
            strokeWidth={strokeWidth}
          />
          <line
            x1="55.4387"
            y1="114.24"
            x2="34.9213"
            y2="151.756"
            strokeWidth={strokeWidth}
          />
        </>
      )}
    </svg>
  );
}
