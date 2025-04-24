
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ClientFormData } from "./types";

interface ContactFieldsProps {
  form: UseFormReturn<ClientFormData>;
  samePhone: boolean;
  onSamePhoneChange: (checked: boolean) => void;
}

const ContactFields = ({ form, samePhone, onSamePhoneChange }: ContactFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер телефона</FormLabel>
            <FormControl>
              <Input placeholder="Введите номер телефона" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contactPerson"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Person</FormLabel>
            <FormControl>
              <Input placeholder="Enter contact person" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormField
          control={form.control}
          name="contactPersonPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person Phone</FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input 
                    placeholder="Enter contact person phone" 
                    {...field} 
                    disabled={samePhone} 
                  />
                </FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="same-phone" 
                    checked={samePhone} 
                    onCheckedChange={onSamePhoneChange} 
                  />
                  <label 
                    htmlFor="same-phone"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same as main phone number
                  </label>
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default ContactFields;
