import React, { useState } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SearchableSelect,
} from "../../components/ui/searchable-select";
import {
  sportOptions,
  timezoneOptions,
  sharingOptions,
  videoTemplateOptions,
  serverOptions,
  storageOptions,
  videoTypeOptions,
  competitionTypeOptions,
  languageOptions,
} from "../../constants/AddVideo";
import { step1Schema, step2Schema } from "../../utils/validations";
import { DatePicker } from "../../components/ui/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { Video, X } from "lucide-react";

// Form data interface
interface FormData {
  // Step 1: Event Details
  eventName: string;
  competitionName: string;
  sport: string;
  date: string;
  time: string;
  timeMinutes: string;
  amPm: string;
  timezone: string;
  eventId: string;

  // Step 2: Video Details
  videoUrl: string;
  sharingOptions: string;
  streamTemplate: string;

  // Step 3: Set Manually Options
  videoTemplate: string;
  analysisServer: string;
  recordingServer: string;
  storage: string;
  videoType: string;
  competitionType: string;
  streamLanguage: string;
}

interface AddVideoFeedModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddVideoFeedModal: React.FC<AddVideoFeedModalProps> = ({
  trigger,
  open,
  onOpenChange,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const initialValues: FormData = {
    eventName: "",
    competitionName: "",
    sport: "",
    date: selectedDate.format("DD.MM.YY"),
    time: "HH",
    timeMinutes: "MM",
    amPm: "PM",
    timezone: "CEST",
    eventId: "",
    videoUrl: "",
    sharingOptions: "dont-share",
    streamTemplate: "auto",
    videoTemplate: "",
    analysisServer: "",
    recordingServer: "",
    storage: "",
    videoType: "",
    competitionType: "",
    streamLanguage: "",
  };

  const getCurrentValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      default:
        return step1Schema;
    }
  };

  const handleNext = (values: FormData, validateForm: () => Promise<any>) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        if (currentStep === 1) {
          setCurrentStep(2);
        }
      }
    });
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (values: FormData) => {
    console.log("Final form data:", values);
    // Handle form submission
    if (onOpenChange) {
      onOpenChange(false);
    }
    // Reset form
    setCurrentStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {/* <DialogContent className="max-w-[900px] max-h-[85vh] bg-black border-2 border-[#373737] overflow-y-auto rounded-[30px] p-6 relative fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"> */}
        <DialogContent className="max-w-[900px] max-h-[85vh] bg-black border-2 border-[#373737] overflow-y-auto rounded-[50px] p-6 relative fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <button
          onClick={() => onOpenChange && onOpenChange(false)}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-white text-center text-[24px] font-medium mb-6">
            Add video feed
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={getCurrentValidationSchema()}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik: FormikProps<FormData>) => (
            <Form className="space-y-6">
              {/* Step Indicators */}
              <div className="flex justify-center mb-8">
                <div className="flex border-[1.5px] border-[#252525] rounded-lg overflow-hidden w-[400px] h-[42px]">
                  <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      currentStep === 1
                        ? "bg-[#252525] text-white border border-white rounded-lg"
                        : "bg-transparent text-white hover:bg-[#252525]"
                    }`}
                    onClick={() => setCurrentStep(1)}
                  >
                    Event details
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      currentStep >= 2
                        ? "bg-[#252525] text-white border border-white rounded-lg"
                        : "bg-transparent text-white hover:bg-[#252525]"
                    }`}
                    onClick={() => setCurrentStep(2)}
                  >
                    Video details
                  </button>
                </div>
              </div>

              {/* Step 1: Event Details */}
              {currentStep === 1 && (
                <div className="space-y-6 max-w-[800px] mx-auto">
                  <div className="space-y-6">
                    <div>
                      <Label
                        htmlFor="eventName"
                        className="text-white text-sm font-medium block mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                      >
                        Event name
                      </Label>
                      <Field
                        as={Input}
                        id="eventName"
                        name="eventName"
                        placeholder="Enter event name"
                        className="bg-[#252525] border-[#252525] text-white placeholder-gray-400 rounded-lg h-[42px] w-full"
                      />
                      {formik.errors.eventName && formik.touched.eventName && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.eventName}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="competitionName"
                        className="text-white text-sm font-medium block mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                      >
                        Competition name
                      </Label>
                      <Field
                        as={Input}
                        id="competitionName"
                        name="competitionName"
                        placeholder="Enter competition name"
                        className="bg-[#252525] border-[#252525] text-white placeholder-gray-400 rounded-lg h-[42px] w-full"
                      />
                      {formik.errors.competitionName &&
                        formik.touched.competitionName && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.competitionName}
                          </div>
                        )}
                    </div>

                    <div className="w-[350px]">
                      <SearchableSelect
                        label="Sport"
                        placeholder="Select sport"
                        options={sportOptions}
                        value={formik.values.sport}
                        searchable={true}
                        required
                        onChange={(value) =>
                          formik.setFieldValue("sport", value)
                        }
                        error={
                          formik.errors.sport && formik.touched.sport
                            ? formik.errors.sport
                            : undefined
                        }
                      />
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-end">
                      <div className="col-span-2">
                        <DatePicker
                          label="Date"
                          value={selectedDate}
                          onChange={(date, dateString) => {
                            if (date) {
                              setSelectedDate(date);
                              formik.setFieldValue("date", dateString);
                            }
                          }}
                          format="DD.MM.YY"
                          required
                        />
                      </div>

                      <div className="col-span-1 text-center">
                        <Label className="text-white text-sm font-medium block mb-2">
                          Time
                        </Label>
                      </div>

                      <div className="col-span-1">
                        <Field
                          as={Input}
                          name="time"
                          value={formik.values.time}
                          onChange={formik.handleChange}
                          className="bg-[#252525] border-[#252525] text-white rounded-lg h-[42px] text-center"
                        />
                      </div>

                      <div className="col-span-1 text-center text-white text-lg">
                        :
                      </div>

                      <div className="col-span-1">
                        <Field
                          as={Input}
                          name="timeMinutes"
                          value={formik.values.timeMinutes}
                          onChange={formik.handleChange}
                          className="bg-[#252525] border-[#252525] text-white rounded-lg h-[42px] text-center"
                        />
                      </div>

                      <div className="col-span-3">
                        <div className="flex border-[1.5px] border-[#252525] rounded-lg overflow-hidden h-[42px]">
                          <button
                            type="button"
                            className={`flex-1 text-sm font-medium transition-colors ${
                              formik.values.amPm === "AM"
                                ? "bg-[#252525] text-white"
                                : "bg-transparent text-white hover:bg-[#252525]"
                            }`}
                            onClick={() => formik.setFieldValue("amPm", "AM")}
                          >
                            AM
                          </button>
                          <button
                            type="button"
                            className={`flex-1 text-sm font-medium transition-colors border-l border-[#252525] ${
                              formik.values.amPm === "PM"
                                ? "bg-[#252525] text-white border border-white"
                                : "bg-transparent text-white hover:bg-[#252525]"
                            }`}
                            onClick={() => formik.setFieldValue("amPm", "PM")}
                          >
                            PM
                          </button>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <SearchableSelect
                          options={timezoneOptions}
                          value={formik.values.timezone}
                          defaultValue="CEST"
                          searchable={true}
                          onChange={(value) =>
                            formik.setFieldValue("timezone", value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="eventId"
                        className="text-white text-sm font-medium block mb-2"
                      >
                        Event ID (optional)
                      </Label>
                      <Field
                        as={Input}
                        id="eventId"
                        name="eventId"
                        placeholder="Enter event name"
                        className="bg-[#252525] border-[#252525] text-white placeholder-gray-400 rounded-lg h-[42px] w-full"
                      />
                    </div>
                  </div>

                  {Object.keys(formik.errors).length > 0 && (
                    <div className="text-center text-white text-sm">
                      Complete required fields before adding video feed
                    </div>
                  )}

                  <div className="flex justify-center gap-4 pt-6">
                    <Button
                      type="button"
                      className="px-6 py-2 bg-[#1B1B1B] border-none text-white hover:bg-[#333] rounded-lg h-[38px] w-[140px]"
                      onClick={() => onOpenChange && onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-6 py-2 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] hover:from-[#0099CC] hover:to-[#003DCC] text-white rounded-lg h-[38px] w-[140px]"
                      onClick={() =>
                        handleNext(formik.values, formik.validateForm)
                      }
                    >
                      Add video feed
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Video Details */}
              {currentStep === 2 && (
                <div className="space-y-6 max-w-[800px] mx-auto">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="w-[320px] h-[180px] bg-[#252525] rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-white text-sm font-medium block mb-2 after:content-['*'] after:text-red-500 after:ml-1">
                          Video URL
                        </Label>
                        <Field
                          as={Input}
                          name="videoUrl"
                          placeholder="Enter video URL"
                          className="bg-[#252525] border-[#252525] text-white placeholder-gray-400 rounded-lg h-[42px] w-full"
                        />
                        {formik.errors.videoUrl && formik.touched.videoUrl && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.videoUrl}
                          </div>
                        )}
                      </div>

                      <div>
                        <SearchableSelect
                          label="Sharing options"
                          placeholder="Select sharing option"
                          options={sharingOptions}
                          value={formik.values.sharingOptions}
                          defaultValue="dont-share"
                          searchable={true}
                          required
                          onChange={(value) =>
                            formik.setFieldValue("sharingOptions", value)
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-white text-sm font-medium block mb-2">
                          Stream template
                        </Label>
                        <div className="flex border-[1.5px] border-[#252525] rounded-lg overflow-hidden h-[42px]">
                          <button
                            type="button"
                            className={`flex-1 text-sm font-medium transition-colors ${
                              formik.values.streamTemplate === "auto"
                                ? "bg-[#252525] text-white"
                                : "bg-transparent text-white hover:bg-[#252525]"
                            }`}
                            onClick={() => {
                              formik.setFieldValue("streamTemplate", "auto");
                            }}
                          >
                            Auto
                          </button>
                          <button
                            type="button"
                            className={`flex-1 text-sm font-medium transition-colors border-l border-[#252525] ${
                              formik.values.streamTemplate === "manual"
                                ? "bg-[#252525] text-white border border-white"
                                : "bg-transparent text-white hover:bg-[#252525]"
                            }`}
                            onClick={() => {
                              formik.setFieldValue("streamTemplate", "manual");
                            }}
                          >
                            Set manually
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manual Settings - Show inline when "Set manually" is selected */}
                  {formik.values.streamTemplate === "manual" && (
                    <div className="space-y-6 border-t border-[#373737] pt-6 mt-6">
                      <SearchableSelect
                        label="Video template"
                        placeholder="Select video template"
                        options={videoTemplateOptions}
                        value={formik.values.videoTemplate}
                        searchable={true}
                        required
                        onChange={(value) =>
                          formik.setFieldValue("videoTemplate", value)
                        }
                        error={
                          formik.errors.videoTemplate &&
                          formik.touched.videoTemplate
                            ? formik.errors.videoTemplate
                            : undefined
                        }
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <SearchableSelect
                          label="Analysis server"
                          placeholder="Select analysis server"
                          options={serverOptions}
                          value={formik.values.analysisServer}
                          searchable={true}
                          required
                          onChange={(value) =>
                            formik.setFieldValue("analysisServer", value)
                          }
                          error={
                            formik.errors.analysisServer &&
                            formik.touched.analysisServer
                              ? formik.errors.analysisServer
                              : undefined
                          }
                        />

                        <SearchableSelect
                          label="Recording server"
                          placeholder="Select recording server"
                          options={serverOptions}
                          value={formik.values.recordingServer}
                          searchable={true}
                          required
                          onChange={(value) =>
                            formik.setFieldValue("recordingServer", value)
                          }
                          error={
                            formik.errors.recordingServer &&
                            formik.touched.recordingServer
                              ? formik.errors.recordingServer
                              : undefined
                          }
                        />
                      </div>

                      <SearchableSelect
                        label="Storage"
                        placeholder="Select storage"
                        options={storageOptions}
                        value={formik.values.storage}
                        searchable={true}
                        required
                        onChange={(value) =>
                          formik.setFieldValue("storage", value)
                        }
                        error={
                          formik.errors.storage && formik.touched.storage
                            ? formik.errors.storage
                            : undefined
                        }
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <SearchableSelect
                          label="Video type"
                          placeholder="Select video type"
                          options={videoTypeOptions}
                          value={formik.values.videoType}
                          searchable={true}
                          required
                          onChange={(value) =>
                            formik.setFieldValue("videoType", value)
                          }
                          error={
                            formik.errors.videoType && formik.touched.videoType
                              ? formik.errors.videoType
                              : undefined
                          }
                        />

                        <SearchableSelect
                          label="Competition type"
                          placeholder="Select competition type"
                          options={competitionTypeOptions}
                          value={formik.values.competitionType}
                          searchable={true}
                          required
                          onChange={(value) =>
                            formik.setFieldValue("competitionType", value)
                          }
                          error={
                            formik.errors.competitionType &&
                            formik.touched.competitionType
                              ? formik.errors.competitionType
                              : undefined
                          }
                        />
                      </div>

                      <SearchableSelect
                        label="Stream language"
                        placeholder="Select stream language"
                        options={languageOptions}
                        value={formik.values.streamLanguage}
                        searchable={true}
                        required
                        onChange={(value) =>
                          formik.setFieldValue("streamLanguage", value)
                        }
                        error={
                          formik.errors.streamLanguage &&
                          formik.touched.streamLanguage
                            ? formik.errors.streamLanguage
                            : undefined
                        }
                      />
                    </div>
                  )}

                  <div className="flex justify-center gap-4 pt-6">
                    <Button
                      type="button"
                      className="px-6 py-2 bg-[#1B1B1B] border-none text-white hover:bg-[#333] rounded-lg h-[38px] w-[140px]"
                      onClick={handleBack}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] hover:from-[#0099CC] hover:to-[#003DCC] text-white rounded-lg h-[38px] w-[140px]"
                    >
                      Add video feed
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddVideoFeedModal;
