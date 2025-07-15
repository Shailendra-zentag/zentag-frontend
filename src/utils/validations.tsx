// Validation schemas for each step Add New Video Modal
import * as Yup from "yup";

export const step1Schema = Yup.object().shape({
  eventName: Yup.string().required("Event name is required"),
  competitionName: Yup.string().required("Competition name is required"),
  sport: Yup.string().required("Sport selection is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  amPm: Yup.string().required("AM/PM is required"),
  timezone: Yup.string().required("Timezone is required"),
});

export const step2Schema = Yup.object()
  .shape({
    videoUrl: Yup.string()
      .url("Please enter a valid URL")
      .required("Video URL is required"),
    sharingOptions: Yup.string().required("Sharing options is required"),
    streamTemplate: Yup.string().required("Stream template is required"),
  })
  .concat(
    Yup.object().shape({
      videoTemplate: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Video template is required"),
        otherwise: (schema) => schema,
      }),
      analysisServer: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Analysis server is required"),
        otherwise: (schema) => schema,
      }),
      recordingServer: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Recording server is required"),
        otherwise: (schema) => schema,
      }),
      storage: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Storage is required"),
        otherwise: (schema) => schema,
      }),
      videoType: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Video type is required"),
        otherwise: (schema) => schema,
      }),
      competitionType: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Competition type is required"),
        otherwise: (schema) => schema,
      }),
      streamLanguage: Yup.string().when("streamTemplate", {
        is: "manual",
        then: (schema) => schema.required("Stream language is required"),
        otherwise: (schema) => schema,
      }),
    }),
  );
