export function ActiveStepIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='6' fill='#1F2733' />
    </svg>
  );
}

export function CompletedStepIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='12' fill='#00A879' />
      <path
        d='M18.5326 9.03032L10.5326 17.0303C10.4629 17.1002 10.3801 17.1557 10.2889 17.1936C10.1978 17.2314 10.1 17.2509 10.0013 17.2509C9.90259 17.2509 9.80485 17.2314 9.71369 17.1936C9.62252 17.1557 9.53973 17.1002 9.47005 17.0303L5.97005 13.5303C5.90029 13.4606 5.84495 13.3777 5.80719 13.2866C5.76943 13.1954 5.75 13.0977 5.75 12.9991C5.75 12.9004 5.76943 12.8027 5.80719 12.7116C5.84495 12.6204 5.90029 12.5376 5.97005 12.4678C6.03982 12.3981 6.12264 12.3427 6.21379 12.305C6.30494 12.2672 6.40264 12.2478 6.5013 12.2478C6.59996 12.2478 6.69766 12.2672 6.78881 12.305C6.87996 12.3427 6.96279 12.3981 7.03255 12.4678L10.0019 15.4372L17.4713 7.96907C17.6122 7.82818 17.8033 7.74902 18.0026 7.74902C18.2018 7.74902 18.3929 7.82818 18.5338 7.96907C18.6747 8.10997 18.7539 8.30107 18.7539 8.50032C18.7539 8.69958 18.6747 8.89068 18.5338 9.03157L18.5326 9.03032Z'
        fill='white'
      />
    </svg>
  );
}

export function PendingStepIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='3' fill='#C5CAD1' />
    </svg>
  );
}

export function getStepIcon(state: 'active' | 'completed' | 'pending') {
  switch (state) {
    case 'active':
      return ActiveStepIcon;
    case 'completed':
      return CompletedStepIcon;
    default:
      return PendingStepIcon;
  }
}
