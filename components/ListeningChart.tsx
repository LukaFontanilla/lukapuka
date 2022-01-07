import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  import { format, parseISO, subDays } from "date-fns";
  import styles from '../styles/Home.module.css'
  import {useDarkModeContext} from '../context/darkModeContext'
  import React, {useState, useEffect} from 'react'

  // linear gradient component

  interface GradientProps {
    gradientString: string,
    gradientLength: number,
  }

  const GradientComponent: React.FC<GradientProps> = ({gradientString,gradientLength}: GradientProps) => {
    const [gradient, setGradient] = useState<string[]>([])
    const gradientSteps = 100 / (gradientLength/2)

    const generateGradient = (gradientString: string) => {
      const gradientList = gradientString.split(' ')
      const startColor = gradientList[0]
      const stopColor = gradientList[gradientList.length -1]
      // this loops through the gradient list and generates the gradient paths for each appropriate color (the length of each array should be the same size and equal to the gradientLength Prop) 
      // gradient direction is top to bottom then back up
      if(gradientList.length > 0) {
        for(let i = 0; i < gradientList.length; i++) {
          if(gradientList[i] === startColor) {
            const stepOneString = (gradientList[i] + ' ').repeat(gradientLength)
            setGradient(prevState => [...prevState, stepOneString])
          } else if(gradientList[i] === stopColor) {
            const lastStepString = gradientList.map(gradientList.pop,[...gradientList]).join(' ') + ' ' + gradientString
            setGradient(prevState => [...prevState, lastStepString])
          } else {
            const gradientSlice = gradientList.slice(0,i+1)
            const gradientRemainder = gradientLength - (gradientSlice.length * 2)
            const finalGradient = gradientSlice.map(gradientSlice.pop,[...gradientSlice]).join(' ') + ' ' + gradientSlice[0].repeat(gradientRemainder) + gradientSlice.join(' ')
            setGradient(prevState => [...prevState, finalGradient])
          }
        }
      }
    }

    useEffect(() => {
      generateGradient(gradientString)
    },[gradientString])

    return (
      <>
      {gradient.map((g,index) =>
        <stop offset={(index === gradient.length - 1 ? ((index +1) * gradientSteps)-5 : (index +1) * gradientSteps).toString() + '%'} stopColor="#FDF6F0" stopOpacity={1 - (index * 0.17)}>
          <animate attributeName="stop-color" values={g} dur={"10s"} repeatCount="indefinite" />
        </stop>
      )}
      </>
    )
  } 
  //


  // data cleaning for game of thrones
  interface SeasonData {
    season: string,
    screentime: number | unknown
  }
  interface ActorData {
    [k: string]: Array<SeasonData>
  }
  const formatSeasons = () => {
    let actorObj: ActorData = {}
    data.forEach((d) => {
      let {actor, totalScreentime, ...rest}:{actor:string, totalScreentime:number,rest:any} = d
      Object.entries(rest.rest).forEach(([k,v]) => {
        actorObj[actor].push({season: k, screentime:v})
      })
    })
  }
  
  
  //
  
  const data1: any[] = [];
  for (let num = 30; num >= 0; num--) {
    data1.push({
      date: subDays(new Date(), num).toISOString().substr(0, 10),
      value: 1 + Math.random(),
    });
  }

  const data2: any[] = [];
  for (let num = 30; num >= 0; num--) {
    data2.push({
      date: subDays(new Date(), num).toISOString().substr(0, 10),
      value: 0.5 + Math.random(),
    });
  }

  const getXValueData1 = data => {
    const index = data1.findIndex(obj => obj.date === data.date);
    return data1[index].value
  };
  
  const getXValueData2 = data => {
    const index = data2.findIndex(obj => obj.date === data.date);
    return data2[index].value
  };
  
  export default function ListeningChart({type}) {
    const darkMode = useDarkModeContext()
    return (
      <div className={styles.visCard}>
        <ResponsiveContainer width="99%" aspect={5} debounce={1}>
        <AreaChart data={data1}>
        {type === 'animatedGradient' ?
          <>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <GradientComponent gradientString='#8884d8; #908bd1; #9792ca; #9e99c3; #a4a0bc; #a9a7b5; #aeaeae;' gradientLength={14}/>
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <GradientComponent gradientString='#332940; #51485d; #71697b; #938c9a; #b6b1bb; #dad7dc; #ffffff;' gradientLength={14}/>
              </linearGradient>
            </defs>
          </>
          :
          <defs>
            <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
        }
          {/* #2451B7 */}
          <Area dataKey={getXValueData1} stroke={darkMode.value ? "white" : "black"} fill={type === 'animatedGradient' ? "url(#color)" : "url(#color3)"} fillOpacity={10} />
          {type === 'animatedGradient' && <Area dataKey={getXValueData2} stroke={darkMode.value ? "white" : "black"} fill="url(#color2)" fillOpacity={10} />}
          <XAxis
            dataKey="date"
            hide={true}
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 20 === 0) {
                return format(date, "MMM, d");
              }
              return "";
            }}
          />
  
          <YAxis
            hide={true}
            dataKey="value"
            axisLine={false}
            tickLine={false}
            // tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
  {/* #0070f3 */}
          <Tooltip 
          content={<CustomTooltip type={type}/>} 
          cursor={{stroke: darkMode.value ? "white" : "white",width:'2rem'}} 
          animationEasing="ease-in" isAnimationActive={true}
          />
  
          <CartesianGrid opacity={0.08} vertical={false} />
        </AreaChart>
        </ResponsiveContainer>
        </div>
    );
  }
  
  function CustomTooltip({ active, payload, label, type }: {active?:any,payload?:any,label?:any,type?:any}) {
    if (active) {
      return (
        <div className={styles.tooltip}>
          <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
          <p>${payload[0].value.toFixed(2)} CAD</p>
          {type === 'animatedGradient' && <p>${payload[1].value.toFixed(2)} CAD</p>}
        </div>
      );
    }
    return null;
  }




  {/* <stop offset="14.2%" stopColor={darkMode.value ? "#FDF6F0" : "#332940"} stopOpacity={1}>
              <animate attributeName="stop-color" values="#93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6;" dur="20s" repeatCount="indefinite" />
              </stop>
              <stop offset="28.4%" stopColor="black" stopOpacity={1}>
              <animate attributeName="stop-color" values="#a5c1cf; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #a5c1cf;" dur="20s" repeatCount="indefinite" />
              </stop>
              <stop offset="42.6%" stopColor={darkMode.value ? "#332940" : "#FDF6F0"} stopOpacity={1}>
              <animate attributeName="stop-color" values="#b7cdd9; #a5c1cf; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #a5c1cf; #b7cdd9;" dur="20s" repeatCount="indefinite" />
              </stop>
              <stop offset="56.8%" stopColor={darkMode.value ? "#332940" : "#FDF6F0"} stopOpacity={1}>
              <animate attributeName="stop-color" values="#c9d9e2; #b7cdd9; #a5c1cf; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #a5c1cf; #b7cdd9; #c9d9e2;" dur="20s" repeatCount="indefinite" />
              </stop>
              <stop offset="71%" stopColor={darkMode.value ? "#332940" : "#FDF6F0"} stopOpacity={1}>
              <animate attributeName="stop-color" values="#dbe6ec; #c9d9e2; #b7cdd9; #a5c1cf; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #a5c1cf; #b7cdd9; #c9d9e2; #dbe6ec;" dur="20s" repeatCount="indefinite" />
              </stop>
              <stop offset="85.2%" stopColor={darkMode.value ? "#332940" : "#FDF6F0"} stopOpacity={1}>
              <animate attributeName="stop-color" values="#edf2f5; #dbe6ec; #c9d9e2; #b7cdd9; #a5c1cf; #93b5c6; #93b5c6; #93b5c6; #93b5c6; #a5c1cf; #b7cdd9; #c9d9e2; #dbe6ec; #edf2f5;" dur="20s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={darkMode.value ? "#332940" : "#FDF6F0"} stopOpacity={1}>
              <animate attributeName="stop-color" values="#ffffff; #edf2f5; #dbe6ec; #c9d9e2; #b7cdd9; #a5c1cf; #93b5c6; #93b5c6; #a5c1cf; #b7cdd9; #c9d9e2; #dbe6ec; #edf2f5; #ffffff;" dur="20s" repeatCount="indefinite" />
              </stop> */}