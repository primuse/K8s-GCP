const handleErrors = (res) => {
  if (!res.ok) {
    throw res;
  } else {
    return res.json();
  }
};

export default handleErrors;
