"use server";

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateName(name: string): Promise<string | { error: string; }> {
  console.log('Updating name...', name);
  if (!name) {
    return {error: 'Name is required'};
  }
  await wait(1000);
  return `name: ${name}`;
}
