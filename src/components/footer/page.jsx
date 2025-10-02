import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-primary-50">
      {/* Atas */}
      <div className="max-w-6xl mx-auto px-5 py-12 flex flex-row justify-start">
        <div className="flex flex-col max-w-sm pt-10 pr-30">
          <h2 className="text-3xl font-semibold">SoulSpace</h2>
          <p className="text-neut-500 font-semibold mt-4">
            Experience personalized medical care from the comfort of your home.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="font-semibold text-primary-500">Support</h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="/getting-started"
                className="text-gray-600 hover:text-primary-600"
              >
                Getting Started
              </a>
            </li>
            <li>
              <a href="/faqs" className="text-gray-600 hover:text-primary-600">
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/help-articles"
                className="text-gray-600 hover:text-primary-600"
              >
                Help Articles
              </a>
            </li>
            <li>
              <a
                href="/report"
                className="text-gray-600 hover:text-primary-600"
              >
                Report an Issue
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-600 hover:text-primary-600"
              >
                Contact Help Desk
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="border-t-2 border-blue-200"></div>
      </div>

      {/* Bawah */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-row items-center justify-between">
        <div className="flex gap-5">
          <Image
            src="assets/icons/fb.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
          <Image
            src="assets/icons/ig.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
          <Image
            src="assets/icons/linkedin.svg"
            alt="LinkedIn"
            width={24}
            height={24}
          />
          <Image
            src="assets/icons/yt.svg"
            alt="YouTube"
            width={24}
            height={24}
          />
        </div>

        <div className="text-neut-600 font-semibold">
          HealNet 2024 © All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
