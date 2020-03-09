import {
  ParentRelationship,
  SchoolClass,
  SchoolPreset,
  TermPreset
} from './preset';

import { PromotionSheet } from './academics';
import { AuthenticationLevels } from './security';

/**
 * entity name mapping to avoid magical variables
 *
 * @export
 * @enum {number}
 */
export enum EntityNames {
  User = 'user_model',
  Manager = 'manager_model',
  School = 'school_model',
  Auth = 'auth_model',
  Parent = 'parent_model',
  Subject = 'subject_model',
  Student = 'student_model',
  Record = 'record_model',
  Receipt = 'receipt_model',
  Setting = 'preference_model',
  Expense = 'expense_model',
  Promotion = 'promotion_model',
  academic_setting = 'academic_setting_model'
}

/**
 * Crud operation that can be carried on various models
 *
 * @export
 * @enum {number}
 */
export enum ModelOperations {
  Create = 'create$',
  Delete = 'delete$',
  Find = 'find$',
  Retrieve = 'retrieve$',
  Update = 'update$'
}

/**
 * Formats Action for model operations
 *
 * @export
 * @param {EntityNames} model
 * @param {ModelOperations} operation
 * @returns
 */
export function modelActionFormat(
  model: EntityNames,
  operation: ModelOperations
) {
  return `[Model] ${model} ${operation}`;
}

export interface BaseModel {
  id: string;
  hash: string;
  createdAt: number;
  updatedAt: number;
  school?: string | Partial<School>;
}

/**
 * school managers biodata's record stored in the database's interface
 *
 * @export
 * @interface Manager
 */
export interface Manager extends Partial<BaseModel> {
  propName: string;
  propPhone: string;
  propEmail: string;
  sMName: string;
  sMPhone: string;
  sMEmail: string;
  motto: string;
}

/**
 * student biodata's record stored in the database's interface
 *
 * @export
 * @interface Parent
 */
export interface Parent extends Partial<BaseModel> {
  phoneNo: number | string;
  name: string;
  relationship: ParentRelationship | string;
  homeAddress: string;
  workAddress?: string;
  email?: string;
  profession: string;
  workcategory: string;
  town: string;
  state: string;
}

/**
 * student payments record stored in the database's interface
 *
 * @export
 * @interface Receipt
 */
export interface Receipt extends Partial<BaseModel> {
  name: string;
  date: number;
  items: Item[];
  teacherId: string | User;
  studentId: string | Student;
  session: string;
  term: string;
  class: SchoolClass;
}

interface Item {
  name: string;
  value: number;
}

/**
 * School biodata record stored in the database's interface
 *
 * @export
 * @interface School
 */
export interface School extends Partial<BaseModel> {
  logo?: string;
  name: string;
  email?: string;
  description: string;
  category: keyof SchoolPreset;
  address: string;
  town: string;
  state: string;
  globalId: string;
}

/**
 * student biodata information recored stored in the database's interface
 *
 * @export
 * @interface Student
 */
export interface Student extends Partial<BaseModel> {
  name: string;
  class: SchoolClass;
  gender: string;
  dob: number;
  bloodgroup?: string;
  prevschool?: string;
  parentPhone: number | string;
  admissionNo: string;
}

/**
 * record of subjects and students
 *
 * @export
 * @interface Record
 * @extends {Partial<BaseModel>}
 */
export interface Record extends Partial<BaseModel> {
  subject: string;
  teacherId: string;
  class: SchoolClass;
  session: string;
  term: TermPreset;
}

/**
 * subject records information recored stored in the database's interface
 *
 * @export
 * @interface Subject
 */
export interface Subject extends Partial<BaseModel> {
  firstCa: number;
  secondCa: number;
  exam: number;
  total: number;
  studentId: string;
  teacherId: string;
  recordId: string;
}

/**
 * Promotion Models, show the histroy of student academic promotions.
 */
export type Promotion = PromotionSheet & Partial<BaseModel>;

/**
 * teachers biodata information recored stored in the database's interface
 *
 * @export
 * @interface User
 */
export interface User extends Partial<BaseModel> {
  name: string;
  gender: string;
  phoneNo: string;
  address: string;
  image: string;
  authId: string | Auth;
  class?: SchoolClass;
  subject?: string;
  phoneNos?: string;
  email?: string;
}

/**
 * program users authorization record stored in the database's interface
 *
 * @export
 * @interface Auth
 */
export interface Auth extends Partial<BaseModel> {
  username: string;
  password: string;
  level: AuthenticationLevels;
}

/**
 * possible interface for graphql response
 *
 * @export
 * @interface AuthGql
 * @extends {Auth}
 */
export interface AuthGql extends Auth {
  biodata?: User[];
}

/**
 * Interface for Busary Expenses in general
 *
 * @export
 * @interface Expense
 */
export interface Expense extends Partial<BaseModel> {
  name: string;
  date: string;
  amount: number;
  receiverId?: string;
  busarId?: string | Partial<User>;
  purpose?: string;
  category: string;
  session: string;
  term: string;
  capital: boolean;
}

/**
 * type settings to be stored for user an of type
 */
export type Settings =
  | { [p in keyof any]: SettingPreference }
  | { _id: string };

export interface Setting extends Partial<BaseModel> {
  /** unique id of setting */
  id: string;
  /** owner id of settings */
  owner: string;
  /** type of owner of setting either school or user */
  type: string;
  /** view to initalize with  */
  defaultView: string;
  /** settings configurations */
  settings: Settings;
}

/**
 * Interface of the SettingState
 *
 * @export
 * @interface SettingPreference
 */
export interface SettingPreference {
  /**
   * that url is clickable
   *
   * @type {boolean}
   * @memberof SettingPreference
   */
  enabled?: boolean;
  /**
   * nested Submenus
   *
   * @type {Settings}
   * @memberof SettingPreference
   */
  submenus?: Settings;
  /**
   * Url Link to route to
   *
   * @type {string}
   * @memberof SettingPreference
   */
  link?: string;
  /**
   * name of the current menu
   *
   * @type {string}
   * @memberof SettingPreference
   */
  name: string;

  /**
   * Inputs to be added to child view
   *
   * @type {{
   *     addClasses: boolean
   *     values: { [k in keyof any ]: string }[];
   *   }}
   * @memberof SettingPreference
   */
  inputs?: Array<{ [k in keyof any]: string }>;
}

export interface RecordScoreConfig {
  title: string;
  max: number;
}

/**
 * configuration for academic records and settings
 *
 * @interface RecordSheetConfig
 */
export interface RecordSheetConfig {
  firstCa: RecordScoreConfig;
  secondCa?: RecordScoreConfig;
  exam: RecordScoreConfig;
}

export interface GradingRange {
  min: number;
  max: number;
}

export interface GradingConfig {
  A: GradingRange;
  B: GradingRange;
  C: GradingRange;
  D: GradingRange;
  E: GradingRange;
  F: GradingRange;
}

/**
 * Academic setting and configuration
 *
 * @export
 * @interface AcademicConfig
 * @extends {Partial<BaseModel>}
 */
export interface AcademicSetting extends Partial<BaseModel> {
  record: RecordSheetConfig;
  grade: GradingConfig;
}
