import { CLIService, DockerService } from '@aneuhold/core-ts-lib';

export default async function startDocker() {
  await DockerService.startDockerDesktop();
  await CLIService.execCmd('docker-compose up -d');
}
