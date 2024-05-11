import React, { useRef } from "react"
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) {
      console.error("Form reference is not defined.")
      return
    }
    toast.loading("Sending message...", { id: "sending-message" })
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY!,
        },
      )
      .then(
        (response) => {
          toast.success("Message sent successfully")
          if (formRef.current) {
            formRef.current.reset() // Reset form
          }
        },
        (error) => {
          console.error("FAILED...", error)
          toast.error("Message failed")
        },
      )
      .finally(() => {
        toast.dismiss("sending-message")
      })
  }
  return (
    <section className="bg-white w-11/12 mx-auto" id="contact">
      <div className="pt-24 pb-14 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Got a query? Want to send feedback about a feature? Need details about
          our premium plan? Let us know.
        </p>
        <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5"
              placeholder="name@creativerse.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-dark focus:border-dark"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-dark focus:border-dark"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-dark sm:w-fit hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactUs
