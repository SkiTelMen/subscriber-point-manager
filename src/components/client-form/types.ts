
import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, { message: "Имя организации должно содержать не менее 2 символов" }),
  tin: z.string().min(10, { message: "ИНН должен быть равен 10" }),
  ogrn: z.string().min(13, { message: "ОГРН должен быть равен 13" }),
  legalAddress: z.string().min(5, { message: "Требуется указать юридический адрес" }),
  actualAddress: z.string().min(5, { message: "Требуется указать фактический адрес" }),
  phoneNumber: z.string().min(5, { message: "Требуется указать номер телефона" }),
  contactPerson: z.string().min(2, { message: "Требуется указать контактное лицо" }),
  contactPersonPhone: z.string().min(5, { message: "Требуется указать телефон контактного лица" }),
});

export type ClientFormData = z.infer<typeof clientSchema>;
