import React, { useState } from "react";
import api from "@/api";
import { Textarea } from "@/components/ui/textarea";
import { HiArrowCircleUp } from "react-icons/hi";
import { FiSlack } from "react-icons/fi";
import { BiLoaderCircle } from "react-icons/bi";

const Home = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api.post("/api/chat/", { message }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(result.data.response); // Adjust this based on the actual response structure
      setMessage("");
    } catch (err) {
      setError("An error occurred while sending your message.");
      console.error(err.response);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format code blocks and text
  const formatCode = (text) => {
    return text
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("```")) {
          // Start or end of a code block
          return (
            <pre
              key={index}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mb-4 whitespace-pre-wrap overflow-x-auto"
            >
              <code>{line.replace(/```/g, "")}</code>
            </pre>
          );
        }
        return (
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
            {line}
          </p>
        );
      });
  };

  return (
    <div className="mb-10 p-6 w-auto max-w-screen-lg mx-auto">
      <div className="text-4xl font-bold text-center p-2 mb-8 text-gray-900 dark:text-white">
        Smart Customer Support System
      </div>
      <div className="text-2xl font-bold text-center p-2 mb-8 text-gray-800 dark:text-gray-200">
        From idea to product
        <FiSlack size={26} className="inline-block mx-3 text-gray-600 dark:text-gray-400" />
      </div>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Response:
          </h2>
          <div className="text-gray-700 dark:text-gray-300">
            {formatCode(response)}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-10">
        <Textarea
          placeholder="Type your message here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full max-w-3xl p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        {message && (
          <button
            type="submit"
            className="flex justify-center items-center border-2 border-[#40a36c] font-semibold p-2 rounded-xl hover:bg-[#40a36c] hover:text-white dark:hover:bg-[#4fed96] dark:hover:text-white transition-colors duration-200"
          >
            Generate <HiArrowCircleUp size={25} className="ml-2" />
          </button>
        )}
      </form>
      {loading && (
        <p className="mt-4 text-gray-500 text-center font-mono text-xl">
          Generating Response
          <BiLoaderCircle className="animate-spin inline-block mx-3 text-gray-600 dark:text-gray-400" />
        </p>
      )}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Home;
