"use server";
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function deliverMessage(message: string): Promise<string> {
  await wait(1000);
  return message;
}
