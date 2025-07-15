export async function submitFormData<T>(url: string, data: T): Promise<any> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const error=`Request failed: ${response.status} ${response.statusText}`

  if (!response.ok) {
    throw new Error(error);
  }

  return response.json();
} 