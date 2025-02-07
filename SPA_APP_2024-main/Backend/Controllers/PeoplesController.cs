using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PeoplesController : ControllerBase
{
    private readonly DataContext _context;

    public PeoplesController(DataContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetPeoples()
    {
        var people = _context.Peoples!.AsQueryable();
        return Ok(people);
    }
    [HttpPost]
    public IActionResult Create([FromBody] People p)
    {
        var dbPeople = _context.Peoples!.Find(p.ID);
        if(dbPeople == null)
        {
            _context.Peoples?.Add(p);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Create), new {p.ID}, p);
        }
        return Conflict();
    }
    [HttpPut("{ID}")]
    public IActionResult Update(int? id, [FromBody] People p) 
    {
        var dbEvent = _context.Peoples!.AsNoTracking().FirstOrDefault(peopleInDB => peopleInDB.ID == p.ID);
        if (id != p.ID || dbEvent == null) return NotFound();
        _context.Update(p);
        _context.SaveChanges();
        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var PeopleToDelete = _context.Peoples?.Find(id);
        if (PeopleToDelete == null) return NotFound();
        _context.Peoples?.Remove(PeopleToDelete);
        _context.SaveChanges();
        return NoContent();
    }
}


