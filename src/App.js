import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core'
import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table'
import sortData from './util'
import LineGraph from './LineGraph'

function App() {
  const [countries, setCountries] = useState(['USA', 'UK'])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo]=useState({})
  const [tableData, setTableData]=useState([])

  useEffect(()=>{
    //get data for infoboxes in first render
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          //set the countries in the dropdown
          setCountries(countries)
          // sort the country by cases number
          const sortedData=sortData(data)
          setTableData(sortedData)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    const url=countryCode==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      //get the selected country data and provide data to info boxes
      setCountry(countryCode)
      setCountryInfo(data)
    })
  }

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID19-Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              {/* Loop through all countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* Info Boxes */}
        <div className="app__stats">
          {/* new cases*/}
          <InfoBox title="Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          {/* recovery */}
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          {/* deaths */}
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>

        {/*  Map*/}
        <Map/>
      </div>
      <Card className="app__right">
     
        <CardContent>
          {/* Table */}
          <h3>Cases by country</h3>
          <Table countries={tableData}></Table>
   
          {/* graph */}
          <h3>Worldwide new cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
