import * as React from 'react';

type IconProps = {
  className?: string;
};

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.75 4.5L6 8.25L2.25 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconSearch() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8035 15.8035L21 21"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconRecent() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 7.5V12L15.75 14.25"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 9.75H3V6"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.3375 18.0004C7.51685 19.1132 8.99798 19.8538 10.5958 20.1297C12.1937 20.4056 13.8374 20.2045 15.3217 19.5515C16.8059 18.8986 18.0648 17.8227 18.9411 16.4584C19.8173 15.0941 20.2721 13.5017 20.2486 11.8804C20.2251 10.2591 19.7244 8.68062 18.8089 7.34226C17.8934 6.0039 16.6039 4.96499 15.1014 4.35533C13.5988 3.74568 11.95 3.59231 10.3608 3.9144C8.77157 4.23648 7.31253 5.01974 6.16594 6.1663C5.0625 7.2838 4.15125 8.33755 3 9.75036"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconToolbox() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 6.75H3C2.58579 6.75 2.25 7.08579 2.25 7.5V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V7.5C21.75 7.08579 21.4142 6.75 21 6.75Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 11.25H21.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 9.75V12.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 9.75V12.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 6.75V5.25C15.75 4.85218 15.592 4.47064 15.3107 4.18934C15.0294 3.90804 14.6478 3.75 14.25 3.75H9.75C9.35218 3.75 8.97064 3.90804 8.68934 4.18934C8.40804 4.47064 8.25 4.85218 8.25 5.25V6.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconImage() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.815 6.27485L20.7126 6.31254L20.815 6.27482V6.27485ZM17.7251 3.185L17.6874 3.28737L17.6875 3.28736L17.7252 3.185H17.7251ZM14.4947 3.185H4.5C3.77375 3.185 3.185 3.77375 3.185 4.5V19.5C3.185 20.2263 3.77375 20.815 4.5 20.815H19.5C20.2263 20.815 20.815 20.2263 20.815 19.5V9.50528L20.7313 9.7325C20.6157 10.0455 20.4068 10.3162 20.133 10.507C19.995 10.6032 19.8438 10.6768 19.685 10.7263V19.5C19.685 19.6022 19.6022 19.685 19.5 19.685H4.5C4.39783 19.685 4.315 19.6022 4.315 19.5V4.5C4.315 4.39783 4.39783 4.315 4.5 4.315H13.2737C13.3232 4.15621 13.3968 4.00498 13.493 3.86695C13.6838 3.5932 13.9539 3.3845 14.2669 3.26896L14.4947 3.185Z"
        fill="currentColor"
      />
      <path
        d="M9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.31494 20.2496L15.5946 9.96899C15.6643 9.89926 15.747 9.84394 15.838 9.80619C15.9291 9.76845 16.0267 9.74902 16.1253 9.74902C16.2238 9.74902 16.3214 9.76845 16.4125 9.80619C16.5035 9.84394 16.5862 9.89926 16.6559 9.96899L20.2503 13.5643"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0192 5.4118C18.283 5.50899 18.4909 5.7169 18.5881 5.98066L19.1999 7.64096L19.8117 5.98066C19.9089 5.7169 20.1168 5.50899 20.3806 5.4118L22.0409 4.8L20.3806 4.1882C20.1168 4.09101 19.9089 3.8831 19.8117 3.61934L19.1999 1.95904L18.5881 3.61934C18.4909 3.8831 18.283 4.09101 18.0192 4.1882L16.3589 4.8L18.0192 5.4118ZM14.6823 5.20528L17.6873 6.31259L18.7946 9.31758C18.8252 9.40044 18.8804 9.47194 18.9529 9.52243C19.0254 9.57293 19.1116 9.6 19.1999 9.6C19.2882 9.6 19.3744 9.57293 19.4469 9.52243C19.5194 9.47194 19.5746 9.40044 19.6052 9.31758L20.7125 6.31259L23.7175 5.20528C23.8003 5.1747 23.8718 5.11945 23.9223 5.04699C23.9728 4.97452 23.9999 4.88832 23.9999 4.8C23.9999 4.71168 23.9728 4.62548 23.9223 4.55301C23.8718 4.48055 23.8003 4.4253 23.7175 4.39472L20.7125 3.28741L19.6052 0.282415C19.5746 0.199557 19.5194 0.128063 19.4469 0.0775674C19.3744 0.0270716 19.2882 0 19.1999 0C19.1116 0 19.0254 0.0270716 18.9529 0.0775674C18.8804 0.128063 18.8252 0.199557 18.7946 0.282415L17.6873 3.28741L14.6823 4.39472C14.5995 4.4253 14.528 4.48055 14.4775 4.55301C14.427 4.62548 14.3999 4.71168 14.3999 4.8C14.3999 4.88832 14.427 4.97452 14.4775 5.04699C14.528 5.11945 14.5995 5.1747 14.6823 5.20528Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ToolbarIconVideo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8 12.5L10 9.5V15.5L14.8 12.5Z"
        stroke="currentColor"
        stroke-width="1.13"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.6595 5.5653L14.6822 5.2052C14.5994 5.17461 14.5279 5.11937 14.4774 5.0469C14.4269 4.97444 14.3998 4.88824 14.3998 4.79991C14.3998 4.71159 14.4269 4.62539 14.4774 4.55292C14.492 4.53197 14.5083 4.51245 14.5262 4.49455C14.5084 4.51244 14.492 4.53194 14.4774 4.55287C14.4269 4.62534 14.3999 4.71154 14.3999 4.79986C14.3999 4.88819 14.4269 4.97439 14.4774 5.04685C14.5279 5.11932 14.5994 5.17456 14.6823 5.20515L15.6597 5.5653H15.6595ZM13.3904 5.5653C13.2657 5.33047 13.1998 5.06778 13.1998 4.79991C13.1998 4.67654 13.2138 4.55426 13.2411 4.4353H3.818C3.37871 4.4353 3.02053 4.66986 2.79041 4.97121C2.56067 5.27206 2.43481 5.66303 2.43481 6.07173V18.9289C2.43481 19.3376 2.56067 19.7285 2.79041 20.0294C3.02053 20.3307 3.37871 20.5653 3.818 20.5653H20.1816C20.6209 20.5653 20.9791 20.3307 21.2092 20.0294C21.439 19.7285 21.5648 19.3376 21.5648 18.9289V7.46983L20.7311 9.73241C20.6629 9.91714 20.5622 10.0871 20.4348 10.2346V18.9289C20.4348 19.1119 20.3775 19.2567 20.3111 19.3436C20.2451 19.43 20.1942 19.4353 20.1816 19.4353H3.818C3.80541 19.4353 3.7545 19.43 3.6885 19.3436C3.62211 19.2567 3.56481 19.1119 3.56481 18.9289V6.07173C3.56481 5.8887 3.62211 5.74396 3.6885 5.65702C3.7545 5.57059 3.80541 5.5653 3.818 5.5653H13.3904ZM21.5635 5.99886C21.5635 5.99887 21.5635 5.99888 21.5635 5.99889L20.7125 6.31245L21.5635 5.99886Z"
        fill="currentColor"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.0192 5.4118C18.283 5.50899 18.4909 5.7169 18.5881 5.98066L19.1999 7.64096L19.8117 5.98066C19.9089 5.7169 20.1168 5.50899 20.3806 5.4118L22.0409 4.8L20.3806 4.1882C20.1168 4.09101 19.9089 3.8831 19.8117 3.61934L19.1999 1.95904L18.5881 3.61934C18.4909 3.8831 18.283 4.09101 18.0192 4.1882L16.3589 4.8L18.0192 5.4118ZM14.6823 5.20528L17.6873 6.31259L18.7946 9.31758C18.8252 9.40044 18.8804 9.47194 18.9529 9.52243C19.0254 9.57293 19.1116 9.6 19.1999 9.6C19.2882 9.6 19.3744 9.57293 19.4469 9.52243C19.5194 9.47194 19.5746 9.40044 19.6052 9.31758L20.7125 6.31259L23.7175 5.20528C23.8003 5.1747 23.8718 5.11945 23.9223 5.04699C23.9728 4.97452 23.9999 4.88832 23.9999 4.8C23.9999 4.71168 23.9728 4.62548 23.9223 4.55301C23.8718 4.48055 23.8003 4.4253 23.7175 4.39472L20.7125 3.28741L19.6052 0.282415C19.5746 0.199557 19.5194 0.128063 19.4469 0.0775674C19.3744 0.0270716 19.2882 0 19.1999 0C19.1116 0 19.0254 0.0270716 18.9529 0.0775674C18.8804 0.128063 18.8252 0.199557 18.7946 0.282415L17.6873 3.28741L14.6823 4.39472C14.5995 4.4253 14.528 4.48055 14.4775 4.55301C14.427 4.62548 14.3999 4.71168 14.3999 4.8C14.3999 4.88832 14.427 4.97452 14.4775 5.04699C14.528 5.11945 14.5995 5.1747 14.6823 5.20528Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function ToolbarIconThreeDee() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.36 2.344C12.2496 2.28361 12.1258 2.25195 12 2.25195C11.8742 2.25195 11.7504 2.28361 11.64 2.344L3.39 6.86088C3.2722 6.92533 3.17386 7.02023 3.10526 7.13567C3.03666 7.25111 3.0003 7.38285 3 7.51713V16.4834C3.0003 16.6177 3.03666 16.7494 3.10526 16.8648C3.17386 16.9803 3.2722 17.0752 3.39 17.1396"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.8363 3.05849L14.2665 3.26847C14.0266 3.357 13.812 3.50023 13.6389 3.68551L12.09 2.83747L12.0899 2.83744L12.0899 2.83739C12.0623 2.82234 12.0314 2.81445 12 2.81445C11.9685 2.81445 11.9376 2.82237 11.91 2.83747C11.6375 2.98658 11.2957 2.88653 11.1465 2.614C10.9974 2.34147 11.0975 1.99966 11.37 1.85054C11.5632 1.74485 11.7798 1.68945 12 1.68945C12.2202 1.68945 12.4368 1.74485 12.63 1.85054L12.6301 1.85061L14.8363 3.05849Z"
        fill="currentColor"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.3117 8.00324L18.3112 8.00353L18.7045 9.07077L18.705 9.07048L18.3117 8.00324ZM17.247 8.58601L11.9999 11.4578L3.3356 6.71566C3.06309 6.56651 2.72126 6.66651 2.57211 6.93903C2.42295 7.21154 2.52296 7.55337 2.79547 7.70252L11.7298 12.5925C11.8981 12.6846 12.1017 12.6846 12.27 12.5925L17.6402 9.65325L17.247 8.58601Z"
        fill="currentColor"
      ></path>
      <path
        d="M12 12.103V21.7508"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M21.5612 7.47974L20.7312 9.73224C20.6635 9.9157 20.5636 10.0846 20.4375 10.2315L20.4375 16.4835C20.4373 16.5168 20.4283 16.5501 20.4112 16.5788C20.394 16.6077 20.3695 16.6314 20.34 16.6475L12.09 21.1644C12.0624 21.1795 12.0315 21.1874 12 21.1874C11.9685 21.1874 11.9376 21.1795 11.91 21.1644L3.66013 16.6476C3.63069 16.6315 3.60597 16.6077 3.58881 16.5788C3.57166 16.55 3.56258 16.517 3.5625 16.4835C3.56179 16.1728 3.30938 15.9215 2.99872 15.9222C2.68807 15.9229 2.4368 16.1754 2.4375 16.486C2.43804 16.721 2.50165 16.9516 2.62171 17.1536C2.74173 17.3555 2.91377 17.5216 3.11987 17.6344L11.3699 22.1513C11.563 22.2569 11.7798 22.3124 12 22.3124C12.2202 22.3124 12.4368 22.257 12.63 22.1513L20.88 17.6345C21.0861 17.5217 21.2583 17.3555 21.3783 17.1536C21.4984 16.9516 21.562 16.721 21.5625 16.486V7.51849C21.5625 7.50546 21.5621 7.49254 21.5612 7.47974Z"
        fill="currentColor"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.0197 5.4118C18.2835 5.50899 18.4914 5.7169 18.5886 5.98066L19.2004 7.64095L19.8122 5.98066C19.9094 5.7169 20.1173 5.50899 20.381 5.4118L22.0413 4.8L20.381 4.1882C20.1173 4.09101 19.9094 3.8831 19.8122 3.61934L19.2004 1.95904L18.5886 3.61934C18.4914 3.8831 18.2835 4.09101 18.0197 4.1882L16.3594 4.8L18.0197 5.4118ZM14.6828 5.20528L17.6878 6.31259L18.7951 9.31758C18.8257 9.40044 18.8809 9.47194 18.9534 9.52243C19.0259 9.57293 19.1121 9.6 19.2004 9.6C19.2887 9.6 19.3749 9.57293 19.4474 9.52243C19.5198 9.47194 19.5751 9.40044 19.6057 9.31758L20.713 6.31259L23.718 5.20528C23.8008 5.1747 23.8723 5.11945 23.9228 5.04699C23.9733 4.97452 24.0004 4.88832 24.0004 4.8C24.0004 4.71168 23.9733 4.62548 23.9228 4.55301C23.8723 4.48055 23.8008 4.4253 23.718 4.39472L20.713 3.28741L19.6057 0.282415C19.5751 0.199557 19.5198 0.128063 19.4474 0.0775674C19.3749 0.0270716 19.2887 0 19.2004 0C19.1121 0 19.0259 0.0270716 18.9534 0.0775674C18.8809 0.128063 18.8257 0.199557 18.7951 0.282415L17.6878 3.28741L14.6828 4.39472C14.5999 4.4253 14.5285 4.48055 14.478 4.55301C14.4275 4.62548 14.4004 4.71168 14.4004 4.8C14.4004 4.88832 14.4275 4.97452 14.478 5.04699C14.5285 5.11945 14.5999 5.1747 14.6828 5.20528Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function ToolbarIconModels() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.90007 16.0994L2.73539 14.1963C2.59298 14.1438 2.4701 14.0488 2.38332 13.9243C2.29653 13.7997 2.25 13.6516 2.25 13.4998C2.25 13.348 2.29653 13.1998 2.38332 13.0753C2.4701 12.9507 2.59298 12.8558 2.73539 12.8032L7.90007 10.9001L9.8032 5.73539C9.85577 5.59298 9.95072 5.4701 10.0753 5.38332C10.1998 5.29653 10.348 5.25 10.4998 5.25C10.6516 5.25 10.7997 5.29653 10.9243 5.38332C11.0488 5.4701 11.1438 5.59298 11.1963 5.73539L13.0994 10.9001L18.2641 12.8032C18.4065 12.8558 18.5294 12.9507 18.6162 13.0753C18.703 13.1998 18.7495 13.348 18.7495 13.4998C18.7495 13.6516 18.703 13.7997 18.6162 13.9243C18.5294 14.0488 18.4065 14.1438 18.2641 14.1963L13.0994 16.0994L11.1963 21.2641C11.1438 21.4065 11.0488 21.5294 10.9243 21.6162C10.7997 21.703 10.6516 21.7495 10.4998 21.7495C10.348 21.7495 10.1998 21.703 10.0753 21.6162C9.95072 21.5294 9.85577 21.4065 9.8032 21.2641L7.90007 16.0994Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 1.5V6"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 6.75V9.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 3.75H18.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 8.25H22.5"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconAssets() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 3.75H7.5C7.08579 3.75 6.75 4.08579 6.75 4.5V16.5C6.75 16.9142 7.08579 17.25 7.5 17.25H19.5C19.9142 17.25 20.25 16.9142 20.25 16.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 9.75C12.0784 9.75 12.75 9.07843 12.75 8.25C12.75 7.42157 12.0784 6.75 11.25 6.75C10.4216 6.75 9.75 7.42157 9.75 8.25C9.75 9.07843 10.4216 9.75 11.25 9.75Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 17.25V19.5C17.25 19.6989 17.171 19.8897 17.0303 20.0303C16.8897 20.171 16.6989 20.25 16.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V7.5C3.75 7.30109 3.82902 7.11032 3.96967 6.96967C4.11032 6.82902 4.30109 6.75 4.5 6.75H6.75"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconHelp() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.8125C12.5178 17.8125 12.9375 17.3928 12.9375 16.875C12.9375 16.3572 12.5178 15.9375 12 15.9375C11.4822 15.9375 11.0625 16.3572 11.0625 16.875C11.0625 17.3928 11.4822 17.8125 12 17.8125Z"
        fill="currentColor"
      />
      <path
        d="M12 13.5V12.75C13.6566 12.75 15 11.5744 15 10.125C15 8.67562 13.6566 7.5 12 7.5C10.3434 7.5 9 8.67562 9 10.125V10.5"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolbarIconDiscord() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.3303 4.22781C18.7767 3.50093 17.1156 2.97267 15.3789 2.67188C15.1656 3.05749 14.9164 3.57614 14.7446 3.98873C12.8985 3.71109 11.0693 3.71109 9.25716 3.98873C9.08539 3.57614 8.83055 3.05749 8.61536 2.67188C6.87681 2.97267 5.21376 3.50287 3.66019 4.23166C0.526643 8.96686 -0.322811 13.5845 0.101917 18.1365C2.18025 19.6885 4.19441 20.6313 6.17457 21.2483C6.66349 20.5754 7.09953 19.8601 7.47518 19.1063C6.75975 18.8344 6.07453 18.499 5.42707 18.1095C5.59884 17.9822 5.76686 17.8492 5.92918 17.7123C9.87819 19.5594 14.1689 19.5594 18.0707 17.7123C18.235 17.8492 18.403 17.9822 18.5728 18.1095C17.9235 18.5009 17.2364 18.8363 16.521 19.1082C16.8966 19.8601 17.3308 20.5774 17.8216 21.2502C19.8036 20.6333 21.8197 19.6905 23.898 18.1365C24.3964 12.8595 23.0467 8.28434 20.3303 4.22781Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ToolbarIconSort() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 16.5L7.5 19.5L4.5 16.5"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 4.5L7.5 19.5"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 7.5L16.5 4.5L19.5 7.5"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 19.5L16.5 4.5"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickAccessIconLevels() {
  // Matches the inline Levels icon in the workflow builder.
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18.75C15 17.5074 13.9926 16.5 12.75 16.5C11.5074 16.5 10.5 17.5074 10.5 18.75C10.5 19.9926 11.5074 21 12.75 21C13.9926 21 15 19.9926 15 18.75Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12C10.5 10.7574 9.49264 9.75 8.25 9.75C7.00736 9.75 6 10.7574 6 12C6 13.2426 7.00736 14.25 8.25 14.25C9.49264 14.25 10.5 13.2426 10.5 12Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 5.25C18 4.00736 16.9926 3 15.75 3C14.5074 3 13.5 4.00736 13.5 5.25C13.5 6.49264 14.5074 7.5 15.75 7.5C16.9926 7.5 18 6.49264 18 5.25Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 18.75L10.5 18.75"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 5.25L13.5 5.25"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 12L6 12"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 18.75L20.25 18.75"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 5.25L20.25 5.25"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12L20.25 12"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickAccessIconCompositor() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 3.75H7.5C7.08579 3.75 6.75 4.08579 6.75 4.5V16.5C6.75 16.9142 7.08579 17.25 7.5 17.25H19.5C19.9142 17.25 20.25 16.9142 20.25 16.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 9.75C12.0784 9.75 12.75 9.07843 12.75 8.25C12.75 7.42157 12.0784 6.75 11.25 6.75C10.4216 6.75 9.75 7.42157 9.75 8.25C9.75 9.07843 10.4216 9.75 11.25 9.75Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.06445 17.2501L16.3441 9.96948C16.4138 9.89974 16.4965 9.84443 16.5876 9.80668C16.6786 9.76894 16.7762 9.74951 16.8748 9.74951C16.9733 9.74951 17.0709 9.76894 17.162 9.80668C17.253 9.84443 17.3357 9.89974 17.4054 9.96948L20.2498 12.8148"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickAccessIconPrompt() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5.25V18.75"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 8.25V5.25H18.75V8.25"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 18.75H15"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickAccessIconImport() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13.5V3"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.25 13.5V19.5H3.75V13.5"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 9.75L12 13.5L8.25 9.75"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickAccessIconExport() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L12 13.5"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.25 13.5V19.5H3.75V13.5"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 6.75L12 3L15.75 6.75"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickAccessIconPreview() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
