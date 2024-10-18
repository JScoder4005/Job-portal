/* eslint-disable react/prop-types */
import { useUser } from '@clerk/clerk-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { saveJob } from '@/api/apiJobs';
import { useEffect, useState } from 'react';

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);

  // console.log({ data: savedJob, loading: loadingSavedJob });

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, { alreadySaved: saved });

  const { user } = useUser();

  // const handleSavedJOb = async () => {
  //   await fnSavedJob({
  //     user_id: user.id,
  //     job_id: job.id,
  //   });
  //   onJobSaved();
  // };

  const handleSavedJOb = async () => {
    try {
      const { data, error } = await fnSavedJob({
        user_id: user.id,
        job_id: job.id,
      });

      if (error) {
        console.error('Error saving job:', error.message || error);
        return;
      }

      if (data) {
        setSaved(true);
        onJobSaved();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flec justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-700 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
        </div>
        <div className="flex gap-2 items-center">
          <MapPinIcon size={15} /> {job.location}
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf('.'))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/jobs/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSavedJOb}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={18} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
