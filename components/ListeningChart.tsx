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
  import faker from '@faker-js/faker'

  // linear gradient component
  
  // implementing data generator class
  interface DataObj {
    dateSortKey: any,
    date: any,
    usd: number,
    euro: number
  }

  class DataGenerator {
    dataObj: DataObj[]
    readonly euroCalc: number

    constructor(range: number, usd: number){
      this.euroCalc = usd * 0.9
      this.dataObj = this.createDate(range, usd, this.euroCalc)
    }

    private createDate(dateRange: number, usd: number, euro: number) {
      const data: DataObj[] = []
      while (dateRange > 0) {
        const dateSortKey = faker.date.recent(dateRange)
        data.push({  
          dateSortKey: dateSortKey,
          date: dateSortKey.toISOString().substr(0, 10), 
          usd: Number(faker.finance.amount(0,usd,2)),
          euro: Number(faker.finance.amount(0,euro,2))
        })
        dateRange--; 
      }
      // sort desc
      return this.sortDesc(data)
    }

    private sortDesc(data: DataObj[]) {
      return data.sort((a,b) => a.dateSortKey - b.dateSortKey)
    }
  }

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
  
  export default function ListeningChart({type}:{type:string}) {
    const darkMode = useDarkModeContext()
    const [range, setRange] = useState<number>()
    const [randomizedData, setRandomizedData] = useState<DataGenerator>()
    // const testData = new DataGenerator(15, 600, 350)

    useEffect(() => {
      const testData = new DataGenerator(15, 600)
      setRandomizedData(testData)
    },[])

    useEffect(() => {
      if(range) {
        const testData = new DataGenerator(range, 600)
        setRandomizedData(testData)
      }
    },[range])

    const getXValueUSD = data => {
      if(randomizedData) {
        const index = randomizedData.dataObj.findIndex(obj => obj.date === data.date);
        // testData.dataObj.findIndex(obj => console.log(obj.date, data.date));
        return randomizedData.dataObj[index]?.usd
      }
    };
  
    const getXValueEuro = data => {
      if(randomizedData) {
      const index = randomizedData.dataObj.findIndex(obj => obj.date === data.date);
      // testData.dataObj.findIndex(obj => console.log(obj.date, data.date));
      return randomizedData.dataObj[index]?.euro
      }
    };

    return (
      <div className={styles.visCard}>
        <div className={styles.footerRow}>
          {[5,10,15,20,25,30].map((t,key) =>
          // 
            <p key={key} className="blogRowText" onClick={(e) => {
              // casting type otherwise typescript throws error stating that textContent doesn't exist
              const target = e.target as HTMLElement
              setRange(Number(target.textContent) ?? 15)
            }}>{t}</p>
          )}
        </div>
        <ResponsiveContainer width="99%" aspect={5} debounce={1}>
        <AreaChart data={randomizedData?.dataObj}>
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
          <Area dataKey={getXValueUSD} stroke={darkMode.value ? "white" : "black"} fill={type === 'animatedGradient' ? "url(#color)" : "url(#color3)"} fillOpacity={10} />
          {type === 'animatedGradient' && <Area dataKey={getXValueEuro} stroke={darkMode.value ? "white" : "black"} fill="url(#color2)" fillOpacity={10} />}
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
            dataKey="usd"
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
    console.log(payload)
    if (active) {
      return (
        <div className={styles.tooltip}>
          <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
          <p>${payload[0].payload.usd}</p>
          {type === 'animatedGradient' && <p>€{payload[0].payload.euro}</p>}
        </div>
      );
    }
    return null;
  }