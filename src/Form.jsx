import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const schema = z.object({
  fname: z.string().min(1, { message: "Firstname is required" }),
  lname: z.string().min(1, { message: "Lastname is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  dateOfBirth: z
    .string()
    .transform((value) => new Date(value))
    .refine((value) => !isNaN(value.getTime()), { message: "Invalid date" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  email: z.string().email(),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  university: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  startingDate: z
    .string()
    .transform((value) => new Date(value))
    .refine((value) => !isNaN(value.getTime()), { message: "Invalid date" }),
  endingDate: z
    .string()
    .transform((value) => new Date(value))
    .refine((value) => !isNaN(value.getTime()), { message: "Invalid date" }),
  description: z.string().optional(),
});

function Form() {
  const [formData, setFormData] = useState("");
  const { register, control, handleSubmit, reset, formState, setValue } =
    useForm({ resolver: zodResolver(schema) });
  const { errors } = formState;

  function handleSubmits(formValues) {
    console.log(formValues);
    setFormData(formValues);
    reset();
  }

  const classNames = `p-4 border rounded-md border-stone-900`;
  const divClass = `flex flex-col w-[100%] gap-4`;

  const flexs = `md:flex justify-center items-center gap-x-4`;

  return (
    <main className="bg-gray-300 py-10">
      <div className="max-w-screen-lg w-[90%] mx-auto px-6 py-10 text-center">
        <h1 className="text-5xl font-bold text-stone-900 capitalize mb-4">
          Be a part of ennovators <br /> growing community!
        </h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          quibusdam perferendis doloribus repudiandae aliquid saepe tempore qui
          voluptatem id dolorum hic alias
        </p>
        <h2 className="text-lg font-bold text-stone-900">
          Fill the form below to join
        </h2>
      </div>
      <section className="max-w-screen-lg w-[90%] mx-auto bg-white px-6 py-10 rounded-lg">
        <form onSubmit={handleSubmit(handleSubmits)}>
          <article className={`${flexs} mb-4`}>
            <div className={`${divClass} mb-4 md:mb-0`}>
              <label htmlFor="">First Name*</label>
              <input
                type="text"
                placeholder="John"
                {...register("fname")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.fname?.message}</h2>
            </div>

            <div className={`${divClass}`}>
              <label htmlFor="">Last Name*</label>
              <input
                type="text"
                placeholder="Doe"
                {...register("lname")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.lname?.message}</h2>
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={`${divClass} mb-4 md:mb-0`}>
              <label htmlFor="date">Date of Birth*</label>
              <input
                type="date"
                {...register("dateOfBirth", { required: "Date is required" })}
                className="w-full p-4 border rounded-md border-stone-900"
              />
              {errors.dates && (
                <span className="text-red-300">
                  {errors.dateOfBirth.message}
                </span>
              )}
              {/* <input type="date" className={classNames}  {...register("dateOfBirth")} /> */}
              {errors.date && (
                <span className="text-red-300">{errors.date.message}</span>
              )}
            </div>

            <div className={divClass}>
              <label htmlFor="gender">Gender*</label>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className="p-4 border rounded-md border-stone-900 w-[100%]"
                  >
                    <option value="" disabled>
                      -select-
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                )}
              />
              {errors.gender && (
                <span className="text-red-300">{errors.gender.message}</span>
              )}
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={`${divClass} mb-4 md:mb-0`}>
              <label htmlFor="">Email*</label>
              <input
                type="email"
                placeholder="John@gmail.com"
                {...register("email")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.email?.message}</h2>
            </div>
            <div className={`flex flex-col w-[100%] gap-4 mt-[-15px]`}>
              <label htmlFor="gender">Phone*</label>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    inputProps={{
                      name: "phoneNumber",
                    }}
                    onChange={(value) => setValue("phoneNumber", value)}
                    inputStyle={{
                      fontSize: "1rem",
                      width: "100%",
                      padding: "1.7rem",
                      paddingLeft: "55px",
                    }}
                    searchClass=""
                    containerClass="border border-stone-900 rounded-md bg-transparent"
                    buttonClass="bg-blue-700 p-4"
                  />
                )}
              />
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={`${divClass} mb-4 md:mb-0`}>
              <label htmlFor="">Country*</label>
              <input
                type="text"
                placeholder="USA"
                {...register("country")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.country?.message}</h2>
            </div>

            <div className={divClass}>
              <label htmlFor="">State*</label>
              <input
                type="text"
                placeholder="Washington"
                {...register("state")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.state?.message}</h2>
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={divClass}>
              <label htmlFor="">University*</label>
              <input
                type="text"
                placeholder="Oxford University"
                {...register("university")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.university?.message}</h2>
            </div>
          </article>
          <div className="flex justify-between items-center gap-4 mb-8">
            <hr className="bg-stone-900 w-[100%]" />
            <h1>Experience</h1>
            <hr className="bg-stone-900 w-[100%]" />
          </div>
          <article className={`${flexs} mb-4`}>
            <div className={`${divClass} mb-4 md:mb-0`}>
              <label htmlFor="">Company/Institute</label>
              <input
                type="text"
                placeholder="Company/Institute"
                {...register("company")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.company?.message}</h2>
            </div>

            <div className={divClass}>
              <label htmlFor="">Role</label>
              <input
                type="text"
                placeholder="e.g. UI/UX Designer"
                {...register("role")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.role?.message}</h2>
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={`${divClass} mb-4 md:mb-0`}>
              <label htmlFor="startingDate">Start Date</label>
              <input
                type="date"
                {...register("startingDate", { required: "Date is required" })}
                className="w-full p-4 border rounded-md border-stone-900"
              />
              {errors.startingDate && (
                <span className="text-red-300">
                  {errors.startingDate.message}
                </span>
              )}
            </div>

            <div className={divClass}>
              <label htmlFor="endingDate">End Date</label>
              <input
                type="date"
                {...register("endingDate", { required: "Date is required" })}
                className="w-full p-4 border rounded-md border-stone-900"
              />
              {errors.endingDate && (
                <span className="text-red-300">
                  {errors.endingDate.message}
                </span>
              )}
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={divClass}>
              <label htmlFor="">Technologies</label>
              <input
                type="text"
                placeholder="e.g. Python,C#,Ruby"
                {...register("technology")}
                className={classNames}
              />
              <h2 className="text-red-300">{errors.technology?.message}</h2>
            </div>
          </article>
          <article className={`${flexs} mb-4`}>
            <div className={divClass}>
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                className="p-2 border rounded-md border-stone-900"
                rows="6"
              />
            </div>
          </article>
          <button
            type="submit"
            className="block bg-green-500 rounded-3xl w-[100%] py-2 text-white text-xl font-semibold"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default Form;
