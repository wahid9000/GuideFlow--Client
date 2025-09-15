import {
  CheckCircle2,
  DollarSign,
  CreditCard,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";

const Success = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  const transactionDetails = {
    transactionId,
    message: decodeURIComponent(message || ""),
    amount,
    status,
  };

  if (!transactionDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <p>Loading...</p>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center border-t-8 border-blue-500 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Success Icon and Heading */}
        <div className="flex flex-col items-center justify-center mb-6">
          <CheckCircle2 className="h-24 w-24 text-green-500 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Your transaction was completed successfully.
          </p>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                <CreditCard className="h-6 w-6 text-blue-500" />
                Transaction ID:
              </span>
              <span className="font-semibold text-gray-900 break-all text-right">
                {transactionDetails.transactionId}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                <MessageCircleMore className="h-6 w-6 text-purple-500" />
                Message:
              </span>
              <span className="font-semibold text-gray-900 text-right">
                {transactionDetails.message}
              </span>
            </div>
          </div>
        </div>

        {/* Amount and Status Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <DollarSign className="h-10 w-10 text-blue-600" />
            <div>
              <p className="text-lg text-gray-700 font-medium">Amount Paid</p>
              <h3 className="text-4xl font-extrabold text-gray-900">
                ${transactionDetails.amount}
              </h3>
            </div>
          </div>
          <Badge
            variant="default"
            className="bg-green-600 text-white text-md px-4 py-2 rounded-full font-semibold"
          >
            Success
          </Badge>
        </div>

        <Link to="/">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 rounded-full shadow-lg transition-colors">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
