"use client";
import AssignedActionItemsModule from "@/components/dashboard/Modules/AssignedActionItemsModule";
import AssignedRisksModule from "@/components/dashboard/Modules/AssignedRisksModule";
import CompanyFactsModule from "@/components/dashboard/Modules/CompanyFactsModule";
import DailyCheckInModule from "@/components/dashboard/Modules/DailyCheckInModule";
import StatisticsModule from "@/components/dashboard/Modules/StatisticsModule";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";


export default function Home() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log("mounted")
    const token = Cookies.get('token');
    const email = Cookies.get('email');

    if (token && email) {
      axios.post('https://elliot-server.ngrok.dev/getUserData', { email: email, token: token }).then((res) => {
        console.log(res.data)
        if (res.data.status) {
          setUser(res.data.data)
        }
        else {
          window.location.href = '/';
        }
      })
    }
    else {
      window.location.href = '/';
    }

  }
    , []);
  return (
    <>
      {user?.display_name && (
        <>
          <DailyCheckInModule user={user} />
          <div className="grid grid-cols-2 gap-6">
            <CompanyFactsModule title={"7 Day Chart"} user={user} days={7} key="1" />
            <CompanyFactsModule title={"30 Day Chart"} user={user} days={30} key="2" />

          </div>
        </>
      )
      }
    </>
  );
}
