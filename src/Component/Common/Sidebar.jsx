import React, { useState } from "react";
import { Link } from "react-router-dom";

const navigationList = [
  {
    name: "Dashboard",
    path:"/",
    pathname:"dashboard",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.53955 0.907986C8.81038 0.697338 9.18962 0.697338 9.46045 0.907986L16.2105 6.15799C16.3931 6.30008 16.5 6.51856 16.5 6.75V15C16.5 15.5967 16.2629 16.169 15.841 16.591C15.419 17.0129 14.8467 17.25 14.25 17.25H3.75C3.15326 17.25 2.58097 17.0129 2.15901 16.591C1.73705 16.169 1.5 15.5967 1.5 15V6.75C1.5 6.51856 1.60685 6.30008 1.78954 6.15799L8.53955 0.907986ZM3 7.11681V15C3 15.1989 3.07902 15.3897 3.21967 15.5303C3.36032 15.671 3.55109 15.75 3.75 15.75H14.25C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15V7.11681L9 2.45015L3 7.11681Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H11.25C11.6642 8.25 12 8.58579 12 9V16.5C12 16.9142 11.6642 17.25 11.25 17.25C10.8358 17.25 10.5 16.9142 10.5 16.5V9.75H7.5V16.5C7.5 16.9142 7.16421 17.25 6.75 17.25C6.33579 17.25 6 16.9142 6 16.5V9Z"
        />
      </svg>
      
    ),
  
  },
  {
    name: "Add Users",
    path:"/add-users",
    pathname:"Add users",
    svg: (
      <i class="fa-solid fa-user-pen"></i>
    ),
  },
  {
    name: "Add Emails",
    path:"/add-email",
    pathname:"addemails",
    svg: (
      <svg
      width="18"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover:fill-blue-600 fill-[#637381]"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C3.45228 5 3 5.45228 3 6V18C3 18.5477 3.45228 19 4 19H20C20.5477 19 21 18.5477 21 18V6C21 5.45228 20.5477 5 20 5H4ZM1 6C1 4.34772 2.34772 3 4 3H20C21.6523 3 23 4.34772 23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.18085 5.42656C1.49757 4.97411 2.1211 4.86408 2.57355 5.18079L12.0001 11.7794L21.4266 5.18079C21.8791 4.86408 22.5026 4.97411 22.8193 5.42656C23.136 5.87901 23.026 6.50254 22.5735 6.81926L12.5735 13.8193C12.2292 14.0603 11.7709 14.0603 11.4266 13.8193L1.42662 6.81926C0.974174 6.50254 0.864139 5.87901 1.18085 5.42656Z"
      />
    </svg>
    ),
  },
  {
    name: "View Signature",
    path:"/view-signature",
    pathname:"viewsignature",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.87661 1.05204C8.21826 0.855165 8.60566 0.751526 9 0.751526C9.39435 0.751526 9.78177 0.855173 10.1234 1.05207C10.124 1.05237 10.1245 1.05267 10.125 1.05297L15.375 4.05296C15.7167 4.25025 16.0005 4.53392 16.198 4.87553C16.3954 5.21713 16.4996 5.60465 16.5 5.99922V12.0008C16.4996 12.3953 16.3954 12.7828 16.198 13.1244C16.0005 13.4661 15.7167 13.7497 15.375 13.947L15.3721 13.9487L10.125 16.947C10.1245 16.9473 10.1241 16.9475 10.1237 16.9478C9.78194 17.1448 9.39444 17.2485 9 17.2485C8.60558 17.2485 8.21809 17.1448 7.87639 16.9478C7.87593 16.9475 7.87546 16.9473 7.875 16.947L2.6279 13.9487L2.625 13.947C2.2833 13.7497 1.99948 13.4661 1.80202 13.1244C1.60456 12.7828 1.5004 12.3953 1.5 12.0008V5.99922C1.5004 5.60465 1.60456 5.21713 1.80202 4.87553C1.99948 4.53392 2.2833 4.25025 2.625 4.05297L2.62789 4.0513L7.87661 1.05204ZM9 2.25153C8.86835 2.25153 8.73901 2.28618 8.625 2.35201L8.62211 2.35368L3.375 5.35201C3.37461 5.35223 3.37421 5.35246 3.37382 5.35269C3.26044 5.41842 3.16626 5.51272 3.10067 5.62619C3.03491 5.73997 3.00019 5.86902 3 6.00043V11.9995C3.00019 12.131 3.03491 12.26 3.10067 12.3738C3.16626 12.4873 3.26044 12.5816 3.37382 12.6473C3.37421 12.6475 3.37461 12.6477 3.375 12.648L8.625 15.648C8.73901 15.7138 8.86835 15.7485 9 15.7485C9.13165 15.7485 9.26098 15.7138 9.375 15.648L9.3779 15.6463L14.625 12.648C14.6254 12.6477 14.6258 12.6475 14.6262 12.6473C14.7396 12.5816 14.8337 12.4873 14.8993 12.3738C14.9651 12.2599 14.9999 12.1307 15 11.9992V6.00076C14.9999 5.86923 14.9651 5.74006 14.8993 5.62619C14.8337 5.51272 14.7396 5.41843 14.6262 5.3527C14.6258 5.35247 14.6254 5.35224 14.625 5.35201L9.375 2.35201C9.26098 2.28619 9.13165 2.25153 9 2.25153Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.80331 4.84446C2.01072 4.48591 2.46951 4.36339 2.82806 4.5708L9.00002 8.14106L15.172 4.5708C15.5305 4.36339 15.9893 4.48591 16.1967 4.84446C16.4041 5.20301 16.2816 5.6618 15.9231 5.86921L9.37556 9.65671C9.14323 9.7911 8.8568 9.7911 8.62447 9.65671L2.07697 5.86921C1.71843 5.6618 1.59591 5.20301 1.80331 4.84446Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V16.56C9.75 16.9742 9.41421 17.31 9 17.31C8.58579 17.31 8.25 16.9742 8.25 16.56V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
        />
      </svg>
    ),

  },
  {
    name: "Add festival",
    path:"/fest-list",
    pathname:"fest-list",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H7.5C7.91421 1.5 8.25 1.83579 8.25 2.25V7.5C8.25 7.91421 7.91421 8.25 7.5 8.25H2.25C1.83579 8.25 1.5 7.91421 1.5 7.5V2.25ZM3 3V6.75H6.75V3H3Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.75 2.25C9.75 1.83579 10.0858 1.5 10.5 1.5H15.75C16.1642 1.5 16.5 1.83579 16.5 2.25V7.5C16.5 7.91421 16.1642 8.25 15.75 8.25H10.5C10.0858 8.25 9.75 7.91421 9.75 7.5V2.25ZM11.25 3V6.75H15V3H11.25Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.75 10.5C9.75 10.0858 10.0858 9.75 10.5 9.75H15.75C16.1642 9.75 16.5 10.0858 16.5 10.5V15.75C16.5 16.1642 16.1642 16.5 15.75 16.5H10.5C10.0858 16.5 9.75 16.1642 9.75 15.75V10.5ZM11.25 11.25V15H15V11.25H11.25Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 10.5C1.5 10.0858 1.83579 9.75 2.25 9.75H7.5C7.91421 9.75 8.25 10.0858 8.25 10.5V15.75C8.25 16.1642 7.91421 16.5 7.5 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V10.5ZM3 11.25V15H6.75V11.25H3Z"
        />
      </svg>
    ),
  },
  {
    name: "Users",
    path:"/admin",
    pathname:"admin",
    svg: (
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          d="M13.8763 11.2356C14.2831 10.9579 14.7602 10.8009 15.2524 10.783C15.7447 10.765 16.232 10.8868 16.6579 11.1343C17.0838 11.3817 17.431 11.7447 17.6592 12.1812C17.8874 12.6177 17.9874 13.1099 17.9476 13.6009C16.9043 13.9655 15.7961 14.1074 14.6946 14.0174C14.6912 13.0318 14.4074 12.0667 13.8763 11.2365C13.4049 10.4972 12.7547 9.88872 11.9857 9.46739C11.2168 9.04606 10.354 8.82548 9.47718 8.82608C8.60052 8.82563 7.7379 9.04627 6.96912 9.4676C6.20034 9.88892 5.55023 10.4973 5.07892 11.2365M14.6937 14.0165L14.6946 14.0435C14.6946 14.2391 14.6841 14.4322 14.6624 14.6226C13.0844 15.5279 11.2964 16.0029 9.47718 16C7.59022 16 5.81892 15.4991 4.29197 14.6226C4.26961 14.4214 4.25887 14.219 4.25979 14.0165M4.25979 14.0165C3.1586 14.1098 2.05102 13.9684 1.00849 13.6017C0.968796 13.1109 1.06883 12.6189 1.29704 12.1825C1.52524 11.7461 1.87229 11.3833 2.29806 11.1359C2.72382 10.8885 3.21092 10.7666 3.70303 10.7845C4.19513 10.8023 4.67215 10.959 5.07892 11.2365M4.25979 14.0165C4.26292 13.0311 4.54816 12.0668 5.07892 11.2365M12.0859 3.60869C12.0859 4.30056 11.811 4.96409 11.3218 5.45332C10.8326 5.94254 10.169 6.21739 9.47718 6.21739C8.78531 6.21739 8.12178 5.94254 7.63255 5.45332C7.14333 4.96409 6.86849 4.30056 6.86849 3.60869C6.86849 2.91682 7.14333 2.25329 7.63255 1.76407C8.12178 1.27484 8.78531 1 9.47718 1C10.169 1 10.8326 1.27484 11.3218 1.76407C11.811 2.25329 12.0859 2.91682 12.0859 3.60869ZM17.3033 6.21739C17.3033 6.47432 17.2527 6.72874 17.1543 6.96612C17.056 7.20349 16.9119 7.41918 16.7302 7.60086C16.5485 7.78253 16.3328 7.92665 16.0955 8.02498C15.8581 8.1233 15.6037 8.17391 15.3467 8.17391C15.0898 8.17391 14.8354 8.1233 14.598 8.02498C14.3606 7.92665 14.145 7.78253 13.9633 7.60086C13.7816 7.41918 13.6375 7.20349 13.5392 6.96612C13.4408 6.72874 13.3902 6.47432 13.3902 6.21739C13.3902 5.69849 13.5964 5.20084 13.9633 4.83392C14.3302 4.467 14.8278 4.26087 15.3467 4.26087C15.8656 4.26087 16.3633 4.467 16.7302 4.83392C17.0971 5.20084 17.3033 5.69849 17.3033 6.21739ZM5.56414 6.21739C5.56414 6.47432 5.51353 6.72874 5.41521 6.96612C5.31688 7.20349 5.17277 7.41918 4.99109 7.60086C4.80941 7.78253 4.59372 7.92665 4.35635 8.02498C4.11897 8.1233 3.86455 8.17391 3.60762 8.17391C3.35069 8.17391 3.09627 8.1233 2.85889 8.02498C2.62152 7.92665 2.40583 7.78253 2.22415 7.60086C2.04247 7.41918 1.89835 7.20349 1.80003 6.96612C1.70171 6.72874 1.6511 6.47432 1.6511 6.21739C1.6511 5.69849 1.85723 5.20084 2.22415 4.83392C2.59107 4.467 3.08872 4.26087 3.60762 4.26087C4.12652 4.26087 4.62417 4.467 4.99109 4.83392C5.35801 5.20084 5.56414 5.69849 5.56414 6.21739Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

  },
];

const footerNavigation = [
  {
    name: "Settings",
    path:"/setting",
    pathname:"Settings",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <g clipPath="url(#clip0_519_55577)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5ZM6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 1.5C8.80109 1.5 8.61032 1.57902 8.46967 1.71967C8.32902 1.86032 8.25 2.05109 8.25 2.25V2.38049C8.24845 2.7681 8.1336 3.14679 7.91958 3.46996C7.70556 3.79313 7.40172 4.04666 7.04545 4.19935C6.98203 4.22653 6.91531 4.24477 6.84721 4.25367C6.52348 4.36704 6.17499 4.39498 5.83575 4.33347C5.445 4.26262 5.08444 4.07634 4.80055 3.79865L4.79464 3.79286L4.74967 3.74783C4.68002 3.6781 4.597 3.62248 4.50596 3.58474C4.41491 3.547 4.31731 3.52757 4.21875 3.52757C4.12019 3.52757 4.02259 3.547 3.93154 3.58474C3.8405 3.62248 3.75778 3.6778 3.68813 3.74754L3.68754 3.74813C3.6178 3.81778 3.56248 3.9005 3.52474 3.99154C3.487 4.08259 3.46757 4.18019 3.46757 4.27875C3.46757 4.37731 3.487 4.47491 3.52474 4.56596C3.56248 4.657 3.6178 4.73972 3.68754 4.80937L3.73868 4.86052C4.01637 5.14441 4.20262 5.505 4.27347 5.89575C4.34291 6.27872 4.29835 6.67347 4.14559 7.03108C4.00642 7.396 3.76273 7.712 3.44479 7.93941C3.12041 8.17142 2.73374 8.30047 2.33504 8.30979L2.3175 8.31H2.25C2.05109 8.31 1.86032 8.38902 1.71967 8.52967C1.57902 8.67032 1.5 8.86109 1.5 9.06C1.5 9.25891 1.57902 9.44968 1.71967 9.59033C1.86032 9.73098 2.05109 9.81 2.25 9.81H2.38049C2.7681 9.81155 3.14679 9.9264 3.46996 10.1404C3.79201 10.3537 4.0449 10.6562 4.19776 11.0108C4.35681 11.3732 4.40408 11.7748 4.33347 12.1642C4.26262 12.555 4.07634 12.9156 3.79865 13.1994L3.79286 13.2054L3.74783 13.2503C3.6781 13.32 3.62248 13.403 3.58474 13.494C3.547 13.5851 3.52757 13.6827 3.52757 13.7812C3.52757 13.8798 3.547 13.9774 3.58474 14.0685C3.62248 14.1595 3.6778 14.2422 3.74754 14.3119L3.74813 14.3125C3.81778 14.3822 3.90049 14.4375 3.99154 14.4753C4.08259 14.513 4.18019 14.5324 4.27875 14.5324C4.37731 14.5324 4.47491 14.513 4.56596 14.4753C4.65701 14.4375 4.73972 14.3822 4.80937 14.3125L4.86052 14.2613C5.14441 13.9836 5.505 13.7974 5.89575 13.7265C6.27872 13.6571 6.67347 13.7017 7.03108 13.8544C7.39599 13.9936 7.712 14.2373 7.93941 14.5552C8.17142 14.8796 8.30047 15.2663 8.30979 15.665L8.31 15.6825V15.75C8.31 15.9489 8.38902 16.1397 8.52967 16.2803C8.67032 16.421 8.86109 16.5 9.06 16.5C9.25891 16.5 9.44968 16.421 9.59033 16.2803C9.73098 16.1397 9.81 15.9489 9.81 15.75V15.6225L9.81001 15.6195C9.81155 15.2319 9.9264 14.8532 10.1404 14.53C10.3537 14.208 10.6562 13.9551 11.0109 13.8022C11.3733 13.6432 11.7748 13.5959 12.1642 13.6665C12.555 13.7374 12.9156 13.9237 13.1994 14.2014L13.2054 14.2071L13.2503 14.2522C13.32 14.3219 13.403 14.3775 13.494 14.4153C13.5851 14.453 13.6827 14.4724 13.7812 14.4724C13.8798 14.4724 13.9774 14.453 14.0685 14.4153C14.1595 14.3775 14.2422 14.3222 14.3119 14.2525L14.3125 14.2519C14.3822 14.1822 14.4375 14.0995 14.4753 14.0085C14.513 13.9174 14.5324 13.8198 14.5324 13.7213C14.5324 13.6227 14.513 13.5251 14.4753 13.434C14.4375 13.343 14.3822 13.2603 14.3125 13.1906L14.2613 13.1395C13.9836 12.8556 13.7974 12.495 13.7265 12.1042C13.6559 11.7148 13.7032 11.3133 13.8622 10.9509C14.0151 10.5962 14.268 10.2937 14.59 10.0804C14.9132 9.8664 15.2919 9.75155 15.6795 9.75001L15.6825 9.74999L15.75 9.75C15.9489 9.75 16.1397 9.67098 16.2803 9.53033C16.421 9.38968 16.5 9.19891 16.5 9C16.5 8.80109 16.421 8.61032 16.2803 8.46967C16.1397 8.32902 15.9489 8.25 15.75 8.25H15.6225L15.6195 8.24999C15.2319 8.24845 14.8532 8.1336 14.53 7.91958C14.2069 7.70556 13.9533 7.40172 13.8006 7.04545C13.7735 6.98203 13.7552 6.91531 13.7463 6.84721C13.633 6.52348 13.605 6.17499 13.6665 5.83575C13.7374 5.445 13.9237 5.08444 14.2014 4.80055L14.2071 4.79464L14.2522 4.74967C14.3219 4.68002 14.3775 4.597 14.4153 4.50596C14.453 4.41491 14.4724 4.31731 14.4724 4.21875C14.4724 4.12019 14.453 4.02259 14.4153 3.93154C14.3775 3.8405 14.3222 3.75778 14.2525 3.68813L14.2519 3.68754C14.1822 3.6178 14.0995 3.56248 14.0085 3.52474C13.9174 3.487 13.8198 3.46757 13.7213 3.46757C13.6227 3.46757 13.5251 3.487 13.434 3.52474C13.343 3.56248 13.2603 3.6178 13.1906 3.68754L13.1395 3.73868C12.8556 4.01637 12.495 4.20262 12.1042 4.27347C11.7148 4.34408 11.3132 4.29681 10.9508 4.13776C10.5962 3.9849 10.2937 3.73201 10.0804 3.40996C9.8664 3.08679 9.75155 2.7081 9.75001 2.32049L9.75 2.3175V2.25C9.75 2.05109 9.67098 1.86032 9.53033 1.71967C9.38968 1.57902 9.19891 1.5 9 1.5ZM14.55 11.25L15.2361 11.5528C15.1968 11.6419 15.1851 11.7408 15.2025 11.8366C15.2197 11.9314 15.2645 12.019 15.3314 12.0882L15.3725 12.1294C15.3724 12.1293 15.3726 12.1295 15.3725 12.1294C15.5816 12.3383 15.7477 12.5866 15.8609 12.8596C15.9741 13.1328 16.0324 13.4256 16.0324 13.7213C16.0324 14.0169 15.9741 14.3097 15.8609 14.5829C15.7477 14.856 15.5817 15.1042 15.3725 15.3131L14.8425 14.7825L15.3731 15.3125C15.1642 15.5217 14.916 15.6877 14.6429 15.8009C14.3697 15.9141 14.0769 15.9724 13.7812 15.9724C13.4856 15.9724 13.1928 15.9141 12.9196 15.8009C12.6466 15.6877 12.3986 15.5219 12.1897 15.3128C12.1896 15.3127 12.1898 15.3129 12.1897 15.3128L12.1482 15.2714C12.079 15.2045 11.9914 15.1597 11.8966 15.1425C11.8008 15.1251 11.7019 15.1368 11.6128 15.1761L11.6055 15.1794C11.5181 15.2168 11.4435 15.279 11.391 15.3583C11.3387 15.4372 11.3106 15.5297 11.31 15.6244V15.75C11.31 16.3467 11.0729 16.919 10.651 17.341C10.229 17.7629 9.65674 18 9.06 18C8.46326 18 7.89097 17.7629 7.46901 17.341C7.04705 16.919 6.81 16.3467 6.81 15.75V15.6933C6.80644 15.5979 6.77495 15.5056 6.71936 15.4278C6.66245 15.3483 6.58292 15.2877 6.49111 15.2539C6.47628 15.2484 6.46163 15.2425 6.44718 15.2361C6.35806 15.1968 6.25921 15.1851 6.16337 15.2025C6.06856 15.2197 5.981 15.2645 5.91172 15.3314L5.87063 15.3725C5.87053 15.3726 5.87072 15.3724 5.87063 15.3725C5.66172 15.5816 5.41338 15.7477 5.14037 15.8609C4.86722 15.9741 4.57444 16.0324 4.27875 16.0324C3.98306 16.0324 3.69028 15.9741 3.41713 15.8609C3.14425 15.7478 2.89631 15.582 2.68746 15.3731C2.47827 15.1642 2.31231 14.916 2.19908 14.6429C2.08585 14.3697 2.02757 14.0769 2.02757 13.7812C2.02757 13.4856 2.08585 13.1928 2.19908 12.9196C2.31231 12.6465 2.47827 12.3983 2.68746 12.1894L2.72858 12.1483C2.79546 12.079 2.84035 11.9914 2.85754 11.8966C2.87491 11.8008 2.86318 11.7019 2.82385 11.6128L2.82061 11.6055C2.78315 11.5181 2.721 11.4435 2.64174 11.391C2.56278 11.3387 2.47031 11.3106 2.37562 11.31H2.25C1.65326 11.31 1.08097 11.0729 0.65901 10.651C0.237053 10.229 0 9.65674 0 9.06C0 8.46326 0.237053 7.89097 0.65901 7.46901C1.08097 7.04705 1.65326 6.81 2.25 6.81H2.30673C2.40213 6.80644 2.49444 6.77495 2.57216 6.71936C2.65173 6.66245 2.71233 6.58292 2.7461 6.49111C2.75155 6.47628 2.75747 6.46163 2.76385 6.44718C2.80318 6.35806 2.81491 6.25921 2.79754 6.16337C2.78035 6.06857 2.73546 5.98101 2.66857 5.91173L2.62747 5.87063C2.41827 5.66166 2.25231 5.41351 2.13908 5.14037C2.02585 4.86722 1.96757 4.57443 1.96757 4.27875C1.96757 3.98307 2.02585 3.69028 2.13908 3.41713C2.25226 3.14412 2.41811 2.89607 2.62717 2.68717C2.83607 2.47811 3.08412 2.31226 3.35713 2.19908C3.63028 2.08585 3.92307 2.02757 4.21875 2.02757C4.51443 2.02757 4.80722 2.08585 5.08037 2.19908C5.35351 2.31231 5.60166 2.47827 5.81063 2.68746L5.85173 2.72857C5.92101 2.79546 6.00857 2.84035 6.10337 2.85754C6.19921 2.87491 6.29806 2.86318 6.38718 2.82385C6.43521 2.80266 6.48519 2.78662 6.5363 2.77592C6.58859 2.74042 6.63374 2.69492 6.66896 2.64174C6.72125 2.56278 6.74941 2.47031 6.75 2.37562V2.25C6.75 1.65326 6.98705 1.08097 7.40901 0.65901C7.83097 0.237053 8.40326 0 9 0C9.59674 0 10.169 0.237053 10.591 0.65901C11.0129 1.08097 11.25 1.65326 11.25 2.25V2.31562C11.2506 2.41031 11.2787 2.50278 11.331 2.58174C11.3835 2.661 11.4581 2.72319 11.5454 2.76064L11.5528 2.76381C11.642 2.80314 11.7408 2.81491 11.8366 2.79754C11.9314 2.78035 12.019 2.73546 12.0883 2.66858L12.1294 2.62747C12.3383 2.41827 12.5865 2.25231 12.8596 2.13908C13.1328 2.02585 13.4256 1.96757 13.7213 1.96757C14.0169 1.96757 14.3097 2.02585 14.5829 2.13908C14.856 2.25231 15.1042 2.41827 15.3131 2.62747C15.522 2.83631 15.6878 3.08424 15.8009 3.35713C15.9141 3.63028 15.9724 3.92306 15.9724 4.21875C15.9724 4.51444 15.9141 4.80722 15.8009 5.08037C15.6877 5.35338 15.5219 5.60143 15.3128 5.81033C15.3127 5.81043 15.3129 5.81023 15.3128 5.81033L15.2714 5.85173C15.2045 5.92101 15.1597 6.00857 15.1425 6.10337C15.1251 6.19921 15.1368 6.29806 15.1761 6.38718C15.1973 6.43521 15.2134 6.48519 15.2241 6.5363C15.2596 6.58859 15.3051 6.63374 15.3583 6.66896C15.4372 6.72125 15.5297 6.74941 15.6244 6.75H15.75C16.3467 6.75 16.919 6.98705 17.341 7.40901C17.7629 7.83097 18 8.40326 18 9C18 9.59674 17.7629 10.169 17.341 10.591C16.919 11.0129 16.3467 11.25 15.75 11.25H15.6844C15.5897 11.2506 15.4972 11.2787 15.4183 11.331C15.339 11.3835 15.2768 11.4581 15.2394 11.5454L14.55 11.25Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_519_55577">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "Log out",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 3C3.55109 3 3.36032 3.07902 3.21967 3.21967C3.07902 3.36032 3 3.55109 3 3.75V14.25C3 14.4489 3.07902 14.6397 3.21967 14.7803C3.36032 14.921 3.55109 15 3.75 15H6.75C7.16421 15 7.5 15.3358 7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5H3.75C3.15326 16.5 2.58097 16.2629 2.15901 15.841C1.73705 15.419 1.5 14.8467 1.5 14.25V3.75C1.5 3.15326 1.73705 2.58097 2.15901 2.15901C2.58097 1.73705 3.15326 1.5 3.75 1.5H6.75C7.16421 1.5 7.5 1.83579 7.5 2.25C7.5 2.66421 7.16421 3 6.75 3H3.75Z"
        />
        <path
          d="M12 12.75L15.75 9L12 5.25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H15.75C16.1642 8.25 16.5 8.58579 16.5 9C16.5 9.41421 16.1642 9.75 15.75 9.75H6.75C6.33579 9.75 6 9.41421 6 9Z"
        />
      </svg>
    ),
  },
];
const Sidebar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [openSideBar, setOpenSieBar] = useState(true);
  const changeSideBar = () => {
    setOpenSieBar(!openSideBar);
  };
  const showMenuItems = () => {
    setShowMenu(!showMenu);
  };

  const [route, setRoute] = useState("dashboard");
  const [show,setShow]=useState(false)
  return (
    <div
          className={`transition-all duration-1000 ease-in-out z-50 bg-white sm:relative sm:flex sm:flex-col gap-2 sm:gap-16 rounded-br-xl h-screen min-h-[600px] py-6 absolute top-0 sm:left-0 ${
            showMenu
              ? "left-0 h-screen overflow-y-auto px-5"
              : "-left-72 sm:left-0"
          } ${openSideBar ? "w-72 px-5" : "w-72 sm:w-24"} overflow-hidden`}
        >
          <div
            className={`transition-all duration-500 delay-700 ease-in-out flex gap-2 justify-start items-center ${
              openSideBar ? "sm:justify-start" : "sm:justify-center"
            }  cursor-pointer relative z-30`}
          >
            <img
              src={
                "https://www.tailwindtap.com/assets/admin/dashboard/logo.svg"
              }
              className="z-30"
              alt="logo"
            />
            <span
              className={`text-xl font-semibold ${
                openSideBar ? " block" : "block sm:hidden"
              } `}
            >
              Uplix Digital
            </span>
            <img
              src={"https://www.tailwindtap.com/assets/admin/dashboard/close.svg"}
              alt="close"
              className={`h-7 cursor-pointer sm:hidden left-5 relative ${
                showMenu ? "block " : "hidden"
              }`}
              onClick={showMenuItems}
            />
            <div
              className={`h-10  w-10 rounded-full bg-white absolute top-0  sm:flex justify-center items-center cursor-pointer hidden ${
                openSideBar ? "rotate-[180deg] -right-3" : "rotate-0 -right-3"
              }`}
              onClick={changeSideBar}
            >
              <svg
                className="w-8 h-8 rotate-[180deg]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 sm:justify-between h-full mt-10 sm:mt-0">
            <div className="md:max-w-[234px]">
              {navigationList?.map((data, index) => (
                 <Link
                 to={data?.path}
                 onClick={() => setRoute(`${data?.pathname}`)}
                 className={` ${
                   route == "addblog" ? " bg-dark text-white " : "text-darkgray"
                 } `}
               >
                <div
                  key={index}
                  className={`flex gap-2.5 items-center cursor-pointer py-2 group hover:bg-[#4F80E1]/[12%] group rounded-md overflow-hidden ${
                    openSideBar
                      ? " pl-5 justify-start flex-row"
                      : "pl-5 sm:pl-0 justify-start sm:justify-center sm:flex-col"
                  } `}
                >
                  <div>{data?.svg}</div>
                  <span
                    className={`font-medium text-base group-hover:text-[#4F80E1] text-[#637381]  
                     ${
                       openSideBar
                         ? " block"
                         : "block sm:hidden group-hover:block sm:group-hover:text-xs"
                     }`}
                  >
                    {data?.name}
                  </span>
                </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <div className="max-w-[234px]">
                {footerNavigation?.map((data, index) => (
                   <Link
                   to={data?.path}
                   onClick={() => setRoute(`${data?.pathname}`)}
                   className={` ${
                     route == "addblog" ? " bg-dark text-white " : "text-darkgray"
                   } `}>
                  <div
                    className={`flex gap-2.5 items-center cursor-pointer py-2 rounded-md hover:bg-[#4F80E1]/[12%] group ${
                      openSideBar
                        ? " pl-5 justify-start flex-row"
                        : "pl-5 sm:pl-0 justify-start sm:justify-center sm:flex-col"
                    }`}
                    key={index}
                  >
                    {data?.svg}
                    <span
                      className={`font-medium text-base group-hover:text-[#4F80E1] text-[#637381] ${
                        openSideBar
                          ? " block"
                          : "block sm:hidden group-hover:block sm:group-hover:text-xs"
                      }`}
                    >
                      {data?.name}
                    </span>
                  </div>
                </Link>
                ))}
              </div>
              <div
                className={`flex gap-3
                 ${openSideBar ? "justify-start pl-5" : "justify-center"} `}
              >
                <img
                  src="https://www.tailwindtap.com/assets/admin/dashboard/user1.svg"
                  alt="user"
                  className={`hidden sm:block ${
                    openSideBar ? "h-10 w-10" : "justify-center"
                  }`}
                />
                <div className={`${openSideBar ? "block" : "hidden"}`}>
                  <div className="flex flex-col pr-1">
                    <span className="text-[#637381] text-sm xl:text-base font-medium truncate w-full max-w-20 cursor-pointer">
                      Dominik Phelps
                    </span>
                    <span className="text-[#637381] text-xs xl:text-sm font-normal truncate w-full max-w-20 cursor-pointer">
                      hello@Dominik.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Sidebar;
