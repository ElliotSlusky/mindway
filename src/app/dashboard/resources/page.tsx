// @ts-nocheck
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ResourcesPage() {


  const list = [
    { title: 'Suicide & Crisis Lifeline', link: 'https://988lifeline.org/', description: 'The 988 Lifeline provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals in the United States.' },
    { title: 'Child Mind Institute', link: 'https://childmind.org/', description: 'The Child Mind Institute is dedicated to transforming the lives of children and families struggling with mental health and learning disorders by giving them the help they need to thrive.' },
    { title: 'Findtreatment.gov', link: 'https://findtreatment.gov/', description: 'Findtreatment.gov is a confidential and anonymous resource for persons seeking treatment for mental and substance use disorders in the United States and its territories.' },
    { title: 'Substance Abuse and Mental Health Services Administration', link: 'https://www.samhsa.gov/', description: "SAMHSA's mission is to lead public health and service delivery efforts that promote mental health, prevent substance misuse, and provide treatments and supports to foster recovery while ensuring equitable access and better outcomes." },

  ]


  return (
    <div>


      <div className="mb-6 text-2xl font-bold">
        Mental Health Resources
      </div>

      {list.map((element, index) => (

        <div key={index} className="mb-6 ">
          <Link href={element.link} target="_blank">
            <div className="mb-1 text-xl font-bold  text-blue-500 hover:text-blue-700">
              {element.title}
            </div>
            <div className="mb-1 text-md">
              {element.description}
            </div>

          </Link>

        </div>
      ))}


    </div>
  )

}