const formatNumber = (views) => {
  if (views < 1000) {
    return views.toString();
  } else if (views < 1000000) {
    return (views / 1000).toFixed(0) + " K";
  } else if (views < 1000000000) {
    return (views / 1000000).toFixed(2) + " M";
  }
  else {
    return (views / 1000000000).toFixed(0) + " B";
  }
}

export default formatNumber;
