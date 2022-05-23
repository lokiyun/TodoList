export const EditBtn = (props) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z"
        fill="#13227a"
      />
    </svg>
  );
};

export const CompleteBtn = (props) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M979.2 153.6c-38.4-25.6-96-12.8-128 19.2L377.6 633.6h-6.4l-198.4-192c-32-32-89.6-44.8-128-19.2-51.2 32-57.6 108.8-19.2 147.2l204.8 204.8L320 864c25.6 25.6 64 25.6 89.6 0L512 774.4l480-473.6c44.8-44.8 38.4-115.2-12.8-147.2z"
        fill={props?.color ? props.color : "#1afa29"}
      />
    </svg>
  );
};

export const DeleteBtn = (props) => {
  return (
    <svg
      t="1653263126605"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5132"
      {...props}
    >
      <path
        d="M451.24718 492.643329a42.542602 42.542602 0 0 1-30.205247-12.337355L331.277043 390.115659a42.542602 42.542602 0 0 1 59.985069-60.410495l90.190316 90.190316a42.542602 42.542602 0 0 1-30.205248 72.747849zM797.118533 935.93724a42.542602 42.542602 0 0 0-47.647714-70.620719 430.53113 430.53113 0 1 1 121.246415-125.500676 42.542602 42.542602 0 1 0 71.896997 45.520584A510.511222 510.511222 0 1 0 797.118533 935.93724z m-405.856421-245.045387l90.190316-90.190316a42.542602 42.542602 0 0 0-59.985069-60.410494l-90.190316 90.615742a42.542602 42.542602 0 1 0 59.985069 59.985068z m300.776195 0a42.542602 42.542602 0 0 0 0-59.985068l-90.190316-90.615742a42.542602 42.542602 0 0 0-59.985069 59.985068l90.190316 90.190316a42.542602 42.542602 0 0 0 59.985069 0z m-90.190316-210.585879l90.190316-90.190315a42.542602 42.542602 0 0 0-59.985069-59.985069l-90.190316 90.190316a42.542602 42.542602 0 1 0 59.985069 59.985068z"
        fill="#3E2AD1"
        p-id="5133"
      ></path>
    </svg>
  );
};