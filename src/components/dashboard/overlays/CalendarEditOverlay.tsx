import { DayType } from "@/app/dashboard/calendar/page";
import Button from "@/components/basic/Button";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";
import Select, { MultiValue, SingleValue } from "react-select";

import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";


const checkinOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
];
function hasBeenSet(localDate, tracking) {
  console.log("hasBeenSet function is called"); // Added console log

  console.log(localDate)

  var dateParts = localDate.toString().split("-");

  // Reorder the date parts to the "MM/DD/YYYY" format
  var formattedDate = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];

  console.log("formattedDate", formattedDate)

  console.log("tracking", tracking)
  if (!tracking) {
    console.log('notracking D:')
    return false;
  }


  let found = tracking.find((element) => element.localDate == formattedDate);

  let isFound = false;
  let index = 0;
  for (let i = 0; i < tracking.length; i++) {
    console.log(tracking[i].localDate)
    console.log(formattedDate)
    if (tracking[i].localDate == formattedDate) {
      console.log("found")
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




export default function CalendarEditOverlay({
  isOpen,
  setOpen,
  day,
  user
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  day: DayType;
  user: any;
}) {

  const [metircs, setMetircs] = useState<any>(null);
  const [facts, setFacts] = useState<
    SingleValue<{ label: string; value: ReactNode }>
  >(checkinOptions[0]);


  const [submitted, setSubmitted] = useState(false);

  function editsub() {
    setSubmitted(true)

    const localDate = day.date;

    var dateParts = localDate.toString().split("-");

    // Reorder the date parts to the "MM/DD/YYYY" format
    var formattedDate = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];

    console.log("formattedDate", formattedDate)
    async function update() {



      let metricsArr = []

      metrics.forEach((metric) => {
        metricsArr.push({ metricName: metric.label, metricValue: metric.value })
      })

      // Parse the date string into a Date object
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

      setOpen(false)


    }
    update()

  }

  const [metrics, setMetrics] = useState(true);




  useEffect(() => {

    if (user?.metrics.length > 0) {
      const hasBeenSetObject = hasBeenSet(day.date, user?.tracking)
      if (hasBeenSetObject.status) {

        // console.log('yoloboy', hasBeenSetObject.day.metrics)
        // let arr = []
        // for (let i = 0; i < hasBeenSet?.day?.metrics.length; i++) {
        //   arr.push({ label: hasBeenSet.day.metrics[i].label, value: parseInt(hasBeenSet.day.metrics[i].value) })
        //   // console.log(user.metrics[i])
        // }
        // console.log(arr.length)
        // console.log(arr)
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


  const replaceElement = (index, newValue) => {
    // Create a copy of the original array
    const newArray = [...metrics];

    // Replace the element at the specified index with the new value
    newArray[index] = { label: metrics[index].label, value: newValue };

    // Update the state with the new array
    setMetrics(newArray);
  };



  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="max-w-md p-6 bg-white rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">
                        Edit Daily Check-In
                      </div>
                      <div className="text-base opacity-60">{day.date}.</div>
                    </div>
                    <div>
                      <Button onClick={editsub}
                        className="min-w-[90px] rounded-lg">                  {hasBeenSet(day.date, user?.tracking).status || submitted ? ("Edit") : ("Submit")}</Button>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
