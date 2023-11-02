import Button from "@/components/basic/Button";
import { ReactNode, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

import axios from "axios";
import Cookies from "js-cookie";


const checkinOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

//@ts-ignore
export default function DailyCheckInModule({ user }) {

  const [metrics, setMetrics] = useState(true);

  function hasBeenSet(localDate, tracking) {
    console.log("hasBeenSet function is called"); // Added console log


    if (!tracking) {
      console.log('notracking D:')
      return false;
    }


    let found = tracking.find((element) => element.localDate == localDate);

    let isFound = false;
    let index = 0;
    for (let i = 0; i < tracking.length; i++) {
      console.log(tracking[i].localDate)
      if (tracking[i].localDate == localDate) {
        console.log("found it LFG")
        isFound = true;
      }
    }

    //get index of found
    try {
      console.log("found", found)
      console.log("found index", tracking.indexOf(found))
    }
    catch {
      console.log("error")
    }
    return { status: isFound, day: tracking[index] }
  }

  useEffect(() => {

    if (user.metrics && user?.metrics.length > 0) {
      const hasBeenSetObject = hasBeenSet(new Date().toLocaleDateString(), user?.tracking)
      console.log(hasBeenSetObject)
      if (hasBeenSetObject.status) {


        setMetrics(hasBeenSetObject.day.metrics)
      }
      else {

        let arr = []
        for (let i = 0; i < user.metrics.length; i++) {
          arr.push({ label: user.metrics[i], value: 1 })
          console.log(user.metrics[i])
        }

        setMetrics(arr)
      }
    }
  }, [user]);



  useEffect(() => {
    console.log(metrics)

  }, [metrics]);




  const [facts, setFacts] = useState<
    SingleValue<{ label: string; value: ReactNode }>
  >(checkinOptions[0]);

  const replaceElement = (index, newValue) => {
    // Create a copy of the original array
    const newArray = [...metrics];

    // Replace the element at the specified index with the new value
    newArray[index] = { label: metrics[index].label, value: newValue };

    // Update the state with the new array
    setMetrics(newArray);
  };



  const [submitted, setSubmitted] = useState(false);
  function editsub() {
    setSubmitted(true)
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    console.log("now: ", now)
    console.log(formattedDate)
    async function update() {

      let metricsArr = []

      metrics.forEach((metric) => {
        metricsArr.push({ metricName: metric.label, metricValue: metric.value })
      })


      var dateParts = formattedDate.split('/');
      var year = parseInt(dateParts[2]);
      var month = parseInt(dateParts[0]) - 1; // Months are 0-based in JavaScript
      var day = parseInt(dateParts[1]);
      var parsedDate = new Date(year, month, day);

      var timestamp = Math.floor(parsedDate.getTime());

      const sendObject = {
        localDate: formattedDate,
        unixTime: timestamp,
        metrics: metrics
      }

      const token = Cookies.get('token');
      const email = Cookies.get('email');

      const res = await axios.post('https://elliot-server.ngrok.dev/setTracking', { email: email, token: token, data: sendObject });

      console.log(res.data);

      //reload page
      window.location.reload();
    }
    update()

  }

  return (
    <div className="mb-6 relative z-10">
      <div className="max-w-md p-6 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg">Daily Check-In</div>
            <div className="text-base opacity-60">Set your daily stats!</div>
          </div>
          <div>
            <Button
              onClick={editsub}
              className="min-w-[90px] rounded-lg"
            >
              {submitted ? "Edit" : "Submit"}
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {/* @ts-ignore */}
          {metrics && metrics.length > 0 && metrics.map((metric, index) => (

            <div key={index} className="flex justify-between items-center">
              <div>{metric.label}</div>
              <div>
                {" "}
                <Select
                  instanceId="facts"
                  className="w-20"
                  placeholder="Select 1 - 10"
                  onChange={(newVal) => {
                    replaceElement(index, newVal.value)
                  }}
                  closeMenuOnSelect={true}
                  defaultValue={checkinOptions[metric.value - 1]}
                  options={checkinOptions}
                />
              </div>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
}
