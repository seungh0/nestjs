import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      // given & when
      const result = service.getAll();

      // then
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      // given
      const title = 'Test Movie';
      const genres = ['test'];
      const year = 2021;
      service.create({
        title: title,
        genres: genres,
        year: year,
      });

      // when
      const movie = service.getOne(1);

      // then
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual(title);
      expect(movie.genres).toEqual(genres);
      expect(movie.year).toEqual(year);
    });

    it('should throw 404 Error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      // given
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2021,
      });
      const beforeDelete = service.getAll().length;

      // when
      service.deleteOne(1);

      // then
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      // given
      const beforeCreate = service.getAll().length;

      // when
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2021,
      });

      // then
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should be update a movie', () => {
      // given
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2021,
      });
      const title = 'Updated Test';

      // when
      service.update(1, {
        title: title,
      });

      const movie = service.getOne(1);

      // then
      expect(movie.title).toEqual(title);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'OK' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
