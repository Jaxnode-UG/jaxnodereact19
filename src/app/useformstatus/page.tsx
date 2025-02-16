import SubmitButton from "../../components/SubmitButton";

export default function UseFormStatusPage() {

  async function wait(ms: number) {
    "use server";
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function submitFormAction(formData: FormData) {
    "use server";
    const name = formData.get("name")?.valueOf() as string;
    wait(1000);
    console.log(name);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">useFormStatus Hook Example</h1>
      <p>
        This example demonstrates how to use the useFormStatus hook to display
        form status messages.
      </p>
      <form action={submitFormAction}>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            focus:ring focus:ring-opacity-50"
          />
          <SubmitButton />
        </div>
        </form>
    </div>
  );
}
