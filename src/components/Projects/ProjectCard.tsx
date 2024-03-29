'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Spinner from '../Shared/Spinner';

interface IProps {
  id: string;
  title: string;
  image: string;
  name: string;
  avatarUrl: string;
  email: string;
}

const ProjectCard = ({ title, image, name, avatarUrl, email, id }: IProps) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 1000));
    setRandomViews((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k');
  }, []);
  return (
    <div className=" flexCenter flex-col rounded-2xl drop-shadow-xl">
      <Link
        href={`/project/${id}`}
        className=" flexCenter group relative w-full h-full"
        onClick={() => setIsLoading(true)}
      >
        <Image
          src={image}
          alt="Project Image"
          width={414}
          height={314}
          className=" w-full h-full object-cover rounded-2xl"
        />
        <div className=" hidden group-hover:flex profile_card-title">
          <p className=" w-full"> {title}</p>
          {isLoading && <Spinner />}
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 gap-2">
        <Link href={`/profile/${email}`} className="flexCenter gap-2">
          <Image
            src={avatarUrl}
            width={24}
            height={24}
            alt="User image"
            className=" rounded-full"
          />
          <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </span>
        </Link>

        <div className=" flexCenter gap-3">
          <div className=" flexCenter gap-2">
            <Image src={`/hearth.svg`} width={13} height={13} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className=" flexCenter gap-2">
            <Image src={`/eye.svg`} width={13} height={13} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
