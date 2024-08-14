"use client"
import React from 'react'

export default function Faqs() {
  return (
    <section className="px-2 mt-24">
      <div className="mx-auto max-w-7xl py-10">
        <div>
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-[#182C4E] lg:text-4xl">Frequently Asked Questions</h1>
            <p className="mt-4 text-base leading-6 tracking-wide text-[#D45028]">
              Below are some general questions that will help you navigate and make the most of our Swasthya Connect system.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              <div className="rounded-md border border-black/30 p-6">
                <dt className="text-lg font-semibold leading-6 text-[#4B5563]">
                  How do I use the report simplifier?
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Upload your medical report and click on the "Summarize" button. You will receive a summary of your report. Additionally, you can ask any questions related to the report in the "Ask Your Medical Doubts" section.
                </dd>
              </div>
              <div className="rounded-md border border-black/30 p-6">
                <dt className="text-lg font-semibold leading-6 text-[#4B5563]">
                  How do I use the medical chatbot?
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  In the chatbot, you can ask any query related to the healthcare domain. You can also ask your medical-related legal doubts and find out what actions you can take if anything goes wrong.
                </dd>
              </div>
              <div className="rounded-md border border-black/30 p-6">
                <dt className="text-lg font-semibold leading-6 text-[#4B5563]">
                  How do I use the health monitoring system?
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  You can see your live health-related data here. In the Historical Data section, you can view a graph of your data over specific intervals of time and make comparisons.
                </dd>
              </div>
              <div className="rounded-md border border-black/30 p-6">
                <dt className="text-lg font-semibold leading-6 text-[#4B5563]">
                  How do I use the health advice system?
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Add the details and set your goals, then click on the "Emotion" button and click "Submit." Next, click "Score" to check your score and "Advice" for personalized advice. Based on your emotions, you can also calculate your stress level.
                </dd>
              </div>
              <div className="rounded-md border border-black/30 p-6">
                <dt className="text-lg font-semibold leading-6 text-[#4B5563]">
                  How can i see my health related goals record?
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Here, you can see graphs of all your health-related goals, compare them with previous records, and take actions accordingly.
                </dd>
              </div>
              <div className="rounded-md border border-black/30 p-6">
                <dt className="text-lg font-semibold leading-6 text-[#4B5563]">
                  How can I find the alternate medicines?
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Just type the name of the medicine you want an alternative for and click enter. You will get all the medicines with the same generic name.
                </dd>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
