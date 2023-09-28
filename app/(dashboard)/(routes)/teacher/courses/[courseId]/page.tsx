import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

export default function page({ params }: Props) {
  const courseId = params.courseId;
  return <div>Course Id: {courseId}</div>;
}
