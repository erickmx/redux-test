export const handleResponses = async response => {
  if (response.ok) {
    const res = await response.json();
    return res;
  }

  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }

  throw new Error("Network response was not ok.");
};

export const handleErrors = error => {
  console.error(`Api call failled: ${error}`);
  throw error;
};
