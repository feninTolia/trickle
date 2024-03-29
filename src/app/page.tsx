import ProjectCard from '@/components/Projects/ProjectCard';
import Categories from '@/components/Shared/Categories';
import LoadMore from '@/components/Shared/LoadMore';
import { fetchAllProjects } from '@/shared/lib/actions';
import { IProjectsSearch } from '@/shared/types';
import ErrorText from '@/components/Shared/ErrorText';

interface IProps {
  searchParams: { category: string; endCursor?: string };
}

export default async function Home({ searchParams }: IProps) {
  const data = (await fetchAllProjects(
    searchParams.category,
    searchParams.endCursor
  )) as IProjectsSearch;

  const projectsToDisplay = data?.mongoDB.projectCollection.edges || [];
  const pagination = data?.mongoDB.projectCollection?.pageInfo;

  if (projectsToDisplay.length === 0) {
    return (
      <section className=" flexStart flex-col paddings w-screen min-w-[320px]">
        <Categories />

        <ErrorText>No projects found, go create some first</ErrorText>
      </section>
    );
  }
  return (
    <section className="flex-start flex-col paddings mb-16 w-screen min-w-[320px]">
      <Categories />

      <section className=" projects-grid">
        {projectsToDisplay.map(({ node }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            title={node.title}
            image={node.image}
            name={node.createdBy.name}
            avatarUrl={node.createdBy.avatarUrl}
            email={node.createdBy.email}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
}
