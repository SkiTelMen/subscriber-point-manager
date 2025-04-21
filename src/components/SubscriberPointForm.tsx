
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useClients } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle } from "lucide-react";

const subscriberPointSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  validityDate: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, { message: "Please enter a valid date" }),
});

type SubscriberPointFormData = z.infer<typeof subscriberPointSchema>;

interface SubscriberPointFormProps {
  clientId: string;
  contractId: string;
}

const SubscriberPointForm = ({ clientId, contractId }: SubscriberPointFormProps) => {
  const { addSubscriberPoint } = useClients();

  const form = useForm<SubscriberPointFormData>({
    resolver: zodResolver(subscriberPointSchema),
    defaultValues: {
      name: "",
      validityDate: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    },
  });

  const onSubmit = (data: SubscriberPointFormData) => {
    addSubscriberPoint(clientId, contractId, data.name, data.validityDate);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h4 className="text-sm font-medium">Add Subscriber Point</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscriber Point Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validityDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validity Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="sm" className="mt-2">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubscriberPointForm;
