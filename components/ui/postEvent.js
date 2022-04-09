async function createEvent(cratedEvent) {
  const response = await fetch('/api/eventDB', {
    method: 'POST',
    body: JSON.stringify(cratedEvent),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export default createEvent;
