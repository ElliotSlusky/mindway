import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, use, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import axios from "axios";
import Cookies from 'js-cookie';


const moduleOptions = [

  { label: "Mood", value: "1" },
  { label: "Sleep", value: "2" },
  { label: "Stress", value: "3" },
  { label: "Anxiety", value: "4" },
  { label: "Depression", value: "5" },
  { label: "Activity", value: "6" },
  { label: "Nutrition", value: "7" },
  { label: "Social", value: "8" },
  { label: "Medication", value: "9" },
  { label: "Therapy", value: "10" },
  { label: "Self-care", value: "11" },
  { label: "Life Events", value: "12" },
  { label: "Journaling", value: "13" },
  { label: "Productivity", value: "14" },
  { label: "Physical Health", value: "15" },
  { label: "Hobbies", value: "16" },
  { label: "Goals", value: "17" },
  { label: "Mindfulness", value: "18" },
  { label: "Support", value: "19" },
  { label: "Well-being", value: "20" }



];

export default function MetricSelectOverlay({ user }) {
  const [open, setOpen] = useState(true);
  const [modules, setModules] = useState<
    MultiValue<{ label: string; value: ReactNode }>
  >([moduleOptions[1]]);

  const [safetyCheck, setSafetyCheck] = useState(true)

  async function Submit() {
    let arr: any = []

    modules.forEach((module) => {
      arr.push(module.label)
    })

    const token = Cookies.get('token');
    const email = Cookies.get('email');

    const postMetrics = async () => {
      const res = await axios.post('https://elliot-server.ngrok.dev/setAllMetrics', { metrics: arr, email: email, token: token });

      console.log(res.data);
      window.location.reload()
    }
    postMetrics()

    setOpen(false)


  }


  useEffect(() => {

    if (user?.metrics && user?.metrics.length > 0) {
      setSafetyCheck(true)
      setOpen(false)
      // setModules(user.metrics)
    }
  }
    , [user]);
  return (
    <Transition.Root show={open} as={Fragment}>
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
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 text-gray-900"
                    >
                      Welcome to Mindway!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select the metrics you would like to track daily.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Select
                    instanceId="modules"
                    onChange={(newVals) => {
                      setModules(newVals)
                    }}
                    closeMenuOnSelect={true}
                    defaultValue={modules}
                    isMulti
                    options={moduleOptions}
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={Submit}
                  >
                    Save Settings
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
