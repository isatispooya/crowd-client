const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.2 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const popupVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, type: 'spring', stiffness: 100 },
  },
  exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.3 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.98 },
};

const logoVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.4, type: 'spring', stiffness: 200 } },
  hover: { rotate: 10, transition: { duration: 0.2 } },
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.3 } },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};
const stepVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: 'spring' } },
};

const backdroppVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, type: 'spring', stiffness: 100 },
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.3 } },
};

export {
  cardVariants,
  logoVariants,
  stepVariants,
  textVariants,
  badgeVariants,
  popupVariants,
  dialogVariants,
  headerVariants,
  backdropVariants,
  backdroppVariants,
  containerVariants,
};
