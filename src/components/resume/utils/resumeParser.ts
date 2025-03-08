
import { ParsedData } from "../types/ResumeTypes";

/**
 * Parse resume content from JSON string to strongly typed object
 * @param parsedContent JSON string containing resume data
 * @returns Typed ParsedData object
 */
export const parseResumeContent = (parsedContent: string): ParsedData => {
  let data: ParsedData = {};
  
  try {
    data = JSON.parse(parsedContent);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
  
  return data;
};

/**
 * Check if resume data has content in a specific section
 * @param data Resume data
 * @param section Section key to check
 * @returns Boolean indicating if section has content
 */
export const hasSectionContent = (data: ParsedData, section: keyof ParsedData): boolean => {
  if (!data || !data[section]) return false;
  
  if (Array.isArray(data[section])) {
    return (data[section] as Array<any>).length > 0;
  }
  
  return !!data[section];
};

/**
 * Get basic info fields that have content
 * @param data Resume data
 * @returns Array of field keys that have content
 */
export const getPopulatedBasicFields = (data: ParsedData): string[] => {
  const basicFields = ['姓名', '手机号', '邮箱', '工作年限', '期望工作地', '期望职位', '自我介绍'];
  return basicFields.filter(field => !!data[field as keyof ParsedData]);
};

/**
 * Check if resume data has avatar images
 * @param data Resume data
 * @returns Boolean indicating if avatars are available
 */
export const hasAvatars = (data: ParsedData): boolean => {
  return Array.isArray(data.avatars) && data.avatars.length > 0;
};

/**
 * Get the first avatar from the resume data
 * @param data Resume data
 * @returns First avatar as base64 string or undefined if none available
 */
export const getFirstAvatar = (data: ParsedData): string | undefined => {
  if (hasAvatars(data)) {
    return data.avatars?.[0];
  }
  return undefined;
};
