import {SelectOption} from "../components/ui/searchable-select";

// Options for select fields
  export const sportOptions: SelectOption[] = [
    { value: "soccer", label: "Soccer" },
    { value: "cricket", label: "Cricket" },
    { value: "basketball", label: "Basketball" },
    { value: "hockey", label: "Hockey" },
    { value: "tennis", label: "Tennis" },
    { value: "football", label: "American Football" },
    { value: "baseball", label: "Baseball" },
    { value: "golf", label: "Golf" },
  ];

  export const timezoneOptions: SelectOption[] = [
    { value: "CEST", label: "CEST" },
    { value: "UTC", label: "UTC" },
    { value: "EST", label: "EST" },
    { value: "PST", label: "PST" },
    { value: "JST", label: "JST" },
    { value: "GMT", label: "GMT" },
  ];

  export const sharingOptions: SelectOption[] = [
    { value: "dont-share", label: "Don't share this stream" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "restricted", label: "Restricted" },
  ];

  export const videoTemplateOptions: SelectOption[] = [
    { value: "template1", label: "Template 1" },
    { value: "template2", label: "Template 2" },
    { value: "template3", label: "Template 3" },
    { value: "template4", label: "Template 4" },
  ];

  export const serverOptions: SelectOption[] = [
    { value: "default", label: "Default Server" },
    { value: "server1", label: "Server 1" },
    { value: "server2", label: "Server 2" },
    { value: "server3", label: "Server 3" },
  ];

  export const storageOptions: SelectOption[] = [
    { value: "local", label: "Local Storage" },
    { value: "cloud", label: "Cloud Storage" },
    { value: "external", label: "External Storage" },
  ];

  export const videoTypeOptions: SelectOption[] = [
    { value: "live", label: "Live Video" },
    { value: "recorded", label: "Recorded Video" },
    { value: "stream", label: "Stream" },
  ];

  export const competitionTypeOptions: SelectOption[] = [
    { value: "international", label: "International" },
    { value: "national", label: "National" },
    { value: "regional", label: "Regional" },
    { value: "local", label: "Local" },
  ];

  export const languageOptions: SelectOption[] = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
  ];