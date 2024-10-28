/* eslint-disable react/prop-types */

import { Boxes, Briefcase, Download, School } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import useFetch from '@/hooks/use-fetch';
import { updateApplications } from '@/api/apiApplications';
import { BarLoader } from 'react-spinners';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = application?.resume;
    link.target = '_blank';
    link.click();
  };

  const { loading: loadingUpdate, fn: fnUpdate } = useFetch(
    updateApplications,
    {
      job_id: application?.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnUpdate(status);
  };

  console.log(application);
  return (
    <Card>
      {loadingUpdate && <BarLoader width={'100%'} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <Briefcase size={18} /> {application?.experience} years of
            experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={18} /> {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={18} /> {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.createdAt).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">{application?.status}</span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application?.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
