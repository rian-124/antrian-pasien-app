import { User } from "@/classes/User";
import { Outlet } from "@/classes/UserModel";

export const mockRoles = [
  { id: 1, name: "ADMIN" },
  { id: 2, name: "PETUGAS" },
  { id: 3, name: "OPERATOR" },
];

export const mockOutlets: Outlet[] = [
  { id: 1, nama_outlet: "IPRJ" },
  { id: 2, nama_outlet: "LAB A" },
  { id: 3, nama_outlet: "LAB B" },
  { id: 2, nama_outlet: "POLI UMUM" } as any,
].filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i);

export const mockLokets = [
  { id: 1, nama_loket: "LOKET 1", outlet_id: 1 },
  { id: 2, nama_loket: "LOKET 2", outlet_id: 1 },
  { id: 3, nama_loket: "LOKET 3", outlet_id: 2 },
];

export const mockUsers: User[] = [
  new User(1, "admin", "Administrator", 1, "IPRJ", 1),
  new User(2, "petugas1", "Petugas IPRJ 1", 1, "IPRJ", 2),
  new User(3, "operator1", "Operator Lab A", 2, "LAB A", 3),
];

export const mockAuth = {
  admin: {
    username: "admin",
    name: "Administrator",
    role_id: 1,
    role: "ADMIN",
    outlet_id: 1,
    outlet: "IPRJ",
    loketId: null,
    password: "admin123",
  },
  petugas1: {
    username: "petugas1",
    name: "Petugas IPRJ 1",
    role_id: 2,
    role: "PETUGAS",
    outlet_id: 1,
    outlet: "IPRJ",
    loketId: 1,
    password: "petugas123",
  },
  operator1: {
    username: "operator1",
    name: "Operator Lab A",
    role_id: 3,
    role: "OPERATOR",
    outlet_id: 2,
    outlet: "LAB A",
    loketId: 3,
    password: "operator123",
  },
};

export const mockAntrian = [
  {
    id: 1,
    nomor_antrian: "A-001",
    nomor_registrasi: "REG-0001",
    outlet: "IPRJ",
    outlet_id: 1,
    users: { name: null },
    pasien: { jenis_registrasi_id: 1 },
    bintang: 0,
    jenis_registrasi_id: 1,
    status: "WAITING",
    createdAt: new Date(),
    updatedAt: new Date(),
    loket: null,
  },
  {
    id: 2,
    nomor_antrian: "A-002",
    nomor_registrasi: "REG-0002",
    outlet: "IPRJ",
    outlet_id: 1,
    users: { name: null },
    pasien: { jenis_registrasi_id: 2 },
    bintang: 1,
    jenis_registrasi_id: 2,
    status: "WAITING",
    createdAt: new Date(),
    updatedAt: new Date(),
    loket: null,
  },
  {
    id: 3,
    nomor_antrian: "A-003",
    nomor_registrasi: "REG-0003",
    outlet: "IPRJ",
    outlet_id: 1,
    users: { name: "Petugas IPRJ 1" },
    pasien: { jenis_registrasi_id: 1 },
    bintang: 0,
    jenis_registrasi_id: 1,
    status: "CALL",
    createdAt: new Date(),
    updatedAt: new Date(),
    loket: "LOKET 1",
  },
  {
    id: 4,
    nomor_antrian: "B-001",
    nomor_registrasi: "REG-0004",
    outlet: "LAB A",
    outlet_id: 2,
    users: { name: null },
    pasien: { jenis_registrasi_id: 1 },
    bintang: 0,
    jenis_registrasi_id: 1,
    status: "WAITING",
    createdAt: new Date(),
    updatedAt: new Date(),
    loket: null,
  },
];

export const isMock = () => process.env.NEXT_PUBLIC_USE_MOCK === "true";
