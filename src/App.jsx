import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [country, setCountry] = useState("");
  const [toggle, setToggle] = useState(false);

  const myAPI = `https://geo.ipify.org/api/v2/country?apiKey=${
    import.meta.env.VITE_API_KEY
  }`;

  const fetchCountry = async () => {
    const res = await fetch(myAPI);
    const data = await res.json();

    setIp(data);
    setToggle(true);
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchAdditionalInfo = async () => {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${ip.location.country}`
    );
    const data = await res.json();

    setCountry(data[0]);
  };

  useEffect(() => {
    fetchAdditionalInfo();
  }, [toggle]);

  console.log("my state is:", ip);
  console.log("my country:", country);

  return (
    <>
      <div>
        {/* <div>Your country is {ip.location?.country}</div> */}
        <div>Your Country is {country.name?.official}</div>
        <div>Your IP is {ip?.ip}</div>
        <div>
          Your flag is <br /> <img src={country.flags?.png} />
        </div>
        <div>
          {" "}
          Your wapper is <br />
          <img
            src={country.coatOfArms?.svg}
            style={{ width: "320px", height: "420px" }}
          />
        </div>
      </div>
      <div></div>
    </>
  );
}

export default App;
